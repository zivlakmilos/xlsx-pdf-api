import Fastify from 'fastify';
import multipart from '@fastify/multipart';
import fs from 'fs';
import util, { promisify } from 'util';
import { pipeline } from 'stream';
import libre from 'libreoffice-convert';

const pump = util.promisify(pipeline);
libre.convertAsync = util.promisify(libre.convert);

const PORT = process.env.port || 8080
const UPLOAD_DIR = '/tmp';

const convert = async (inputPath) => {
  const xlsxBuf = fs.readFileSync(inputPath);
  const pdfBuf = await libre.convertAsync(xlsxBuf, '.pdf', undefined);

  return pdfBuf;
}

const app = Fastify({
  logger: true
});

app.register(multipart);

app.post('/api/convert', async (req, res) => {
  const data = await req.file();
  const filePath = `${UPLOAD_DIR}/${data.filename}`
  await pump(data.file, fs.createWriteStream(filePath));

  const pdf = await convert(filePath);
  fs.rmSync(filePath);

  res.header('Content-Type', 'application/pdf');
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "POST");
  res.send(pdf).type('application/pdf').code(200);
});

app.listen({ port: PORT });
