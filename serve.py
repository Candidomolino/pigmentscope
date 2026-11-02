from http.server import SimpleHTTPRequestHandler, ThreadingHTTPServer
from functools import partial
from pathlib import Path
import re
class Handler(SimpleHTTPRequestHandler):
    def send_head(self):
        self.byte_range=None
        path=Path(self.translate_path(self.path))
        header=self.headers.get('Range')
        if not header or not path.is_file(): return super().send_head()
        size=path.stat().st_size
        match=re.fullmatch(r'bytes=(\d+)-(\d*)',header.strip())
        if not match:
            self.send_error(416,'Only one explicit byte range is supported'); return None
        start=int(match[1]); end=min(int(match[2]) if match[2] else size-1,size-1)
        if start>=size or start>end:
            self.send_response(416); self.send_header('Content-Range',f'bytes */{size}'); self.end_headers(); return None
        f=path.open('rb'); f.seek(start); self.byte_range=(start,end)
        self.send_response(206); self.send_header('Content-Type',self.guess_type(str(path)))
        self.send_header('Content-Range',f'bytes {start}-{end}/{size}')
        self.send_header('Content-Length',str(end-start+1)); self.send_header('Accept-Ranges','bytes')
        self.end_headers(); return f
    def end_headers(self):
        if not self.byte_range: self.send_header('Accept-Ranges','bytes')
        self.send_header('Cache-Control','no-cache')
        super().end_headers()
    def copyfile(self,source,outputfile):
        if not self.byte_range: return super().copyfile(source,outputfile)
        remaining=self.byte_range[1]-self.byte_range[0]+1
        while remaining:
            data=source.read(min(65536,remaining))
            if not data: break
            outputfile.write(data);remaining-=len(data)
if __name__=='__main__':
    root=Path(__file__).resolve().parent/'docs'
    server=ThreadingHTTPServer(('127.0.0.1',8765),partial(Handler,directory=str(root)))
    print('PigmentScope: http://127.0.0.1:8765/',flush=True)
    server.serve_forever()

