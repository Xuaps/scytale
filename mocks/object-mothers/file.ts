import faker from "faker";
import streamBuffers from "stream-buffers";

export function newFile() {
  return {
    docId: faker.system.fileName(),
    buffer: Buffer.alloc(8),
  };
}

export function newReadableStream(buffer: Buffer) {
  const myReadableStreamBuffer = new streamBuffers.ReadableStreamBuffer({
    frequency: 10,
    chunkSize: 2048,
  });
  myReadableStreamBuffer.put(buffer);
  myReadableStreamBuffer.stop();

  return myReadableStreamBuffer;
}
