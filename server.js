const http = require('http');
const fs = require('fs');
const path = require('path');
const url = require('url');

const PORT = process.env.PORT || 3006;

// MIMEタイプのマッピング
const mimeTypes = {
  '.html': 'text/html',
  '.js': 'text/javascript',
  '.css': 'text/css',
  '.json': 'application/json',
  '.png': 'image/png',
  '.jpg': 'image/jpg',
  '.gif': 'image/gif',
  '.svg': 'image/svg+xml',
  '.mp4': 'video/mp4',
  '.webm': 'video/webm',
  '.woff': 'application/font-woff',
  '.ttf': 'application/font-ttf',
  '.eot': 'application/vnd.ms-fontobject',
  '.otf': 'application/font-otf',
  '.wasm': 'application/wasm'
};

// 静的ファイルを配信する関数
function serveStaticFile(filePath, res) {
  const ext = path.extname(filePath).toLowerCase();
  const contentType = mimeTypes[ext] || 'application/octet-stream';

  fs.readFile(filePath, (err, content) => {
    if (err) {
      if (err.code === 'ENOENT') {
        res.writeHead(404, { 'Content-Type': 'text/html' });
        res.end('<h1>404 - File Not Found</h1>', 'utf-8');
      } else {
        res.writeHead(500);
        res.end(`Server Error: ${err.code}`, 'utf-8');
      }
    } else {
      res.writeHead(200, { 'Content-Type': contentType });
      res.end(content, 'utf-8');
    }
  });
}

// APIエンドポイント: 商品一覧取得
function getProducts(req, res) {
  const filePath = path.join(__dirname, 'products.json');
  
  fs.readFile(filePath, 'utf8', (err, data) => {
    if (err) {
      res.writeHead(500, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ error: 'Failed to read products' }), 'utf-8');
    } else {
      res.writeHead(200, { 
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      });
      res.end(data, 'utf-8');
    }
  });
}

// APIエンドポイント: 商品詳細取得
function getProductById(req, res, productId) {
  const filePath = path.join(__dirname, 'products.json');
  
  fs.readFile(filePath, 'utf8', (err, data) => {
    if (err) {
      res.writeHead(500, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ error: 'Failed to read products' }), 'utf-8');
    } else {
      try {
        const products = JSON.parse(data);
        const product = products.products.find(p => p.id === productId);
        
        if (product) {
          res.writeHead(200, { 
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*'
          });
          res.end(JSON.stringify(product), 'utf-8');
        } else {
          res.writeHead(404, { 'Content-Type': 'application/json' });
          res.end(JSON.stringify({ error: 'Product not found' }), 'utf-8');
        }
      } catch (parseErr) {
        res.writeHead(500, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: 'Failed to parse products' }), 'utf-8');
      }
    }
  });
}

// APIエンドポイント: 決済セッション作成（Stripe統合用、後で実装）
function createCheckoutSession(req, res) {
  let body = '';
  
  req.on('data', chunk => {
    body += chunk.toString();
  });
  
  req.on('end', () => {
    try {
      const cartData = JSON.parse(body);
      
      // ここで後からStripe Checkout Sessionを作成する処理を追加
      // 現在はプレースホルダーとしてカートデータを返す
      res.writeHead(200, { 
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      });
      res.end(JSON.stringify({ 
        message: 'Checkout session endpoint ready for Stripe integration',
        cart: cartData 
      }), 'utf-8');
    } catch (err) {
      res.writeHead(400, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ error: 'Invalid request data' }), 'utf-8');
    }
  });
}

// サーバー作成
const server = http.createServer((req, res) => {
  const parsedUrl = url.parse(req.url, true);
  // URLエンコードされた文字（%20など）をデコード
  let pathname = decodeURIComponent(parsedUrl.pathname);
  const method = req.method;

  // APIエンドポイントの処理
  if (pathname.startsWith('/api/')) {
    if (pathname === '/api/products' && method === 'GET') {
      getProducts(req, res);
    } else if (pathname.startsWith('/api/products/') && method === 'GET') {
      const productId = pathname.split('/api/products/')[1];
      getProductById(req, res, productId);
    } else if (pathname === '/api/checkout' && method === 'POST') {
      createCheckoutSession(req, res);
    } else {
      res.writeHead(404, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ error: 'API endpoint not found' }), 'utf-8');
    }
    return;
  }

  // 静的ファイルの配信
  let filePath;
  
  // publicフォルダ内のリソース（画像、動画など）
  if (pathname.startsWith('/public/')) {
    filePath = path.join(__dirname, pathname);
  } else if (pathname.startsWith('/images/')) {
    // imagesフォルダ内の画像
    filePath = path.join(__dirname, pathname);
  } else if (pathname === '/') {
    filePath = path.join(__dirname, 'index.html');
  } else {
    // HTMLファイル、CSS、JSなどのルートレベルのファイル
    filePath = path.join(__dirname, pathname);
  }

  serveStaticFile(filePath, res);
});

server.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}/`);
  console.log('API Endpoints:');
  console.log(`  GET  /api/products - Get all products`);
  console.log(`  GET  /api/products/:id - Get product by ID`);
  console.log(`  POST /api/checkout - Create checkout session (Stripe ready)`);
});

