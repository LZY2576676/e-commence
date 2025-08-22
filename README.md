# E-commerce 全栈应用

这是一个完整的电商平台，包含前端用户界面、后端API服务和管理员面板。

## 项目结构

```
ecomence-app/
├── frontend/          # React前端用户界面
├── backend/           # Node.js + Express后端API
├── admin/             # React管理员面板
├── package.json       # 根目录配置
└── README.md          # 项目说明
```

## 技术栈

### Frontend (前端)
- React 19
- Vite
- React Router DOM
- Tailwind CSS
- React Toastify

### Backend (后端)
- Node.js
- Express.js
- MongoDB + Mongoose
- JWT认证
- Cloudinary (图片存储)
- Stripe (支付)
- Bcrypt (密码加密)

### Admin (管理面板)
- React 18
- Vite
- Axios
- React Router DOM

## 环境要求

- Node.js 16+
- MongoDB数据库
- Cloudinary账户 (用于图片存储)
- Stripe账户 (用于支付处理)

## 安装和运行

### 1. 克隆项目
```bash
git clone <repository-url>
cd ecomence-app
```

### 2. 安装依赖

#### 安装前端依赖
```bash
cd frontend
npm install
```

#### 安装后端依赖
```bash
cd ../backend
npm install
```

#### 安装管理面板依赖
```bash
cd ../admin
npm install
```

### 3. 环境配置

#### Backend环境配置
在 `backend/.env` 文件中配置以下变量：
```env
MONGODB_URI=mongodb+srv://username:password@cluster0.mongodb.net/ecommerce
CLOUDINARY_NAME=your_cloudinary_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_SECRET_KEY=your_cloudinary_secret_key
JWT_SECRET=your_jwt_secret_key
ADMIN_EMAIL=admin@ecommerce.com
ADMIN_PASSWORD=admin123
STRIPE_SECRET_KEY=your_stripe_secret_key
```

#### Admin环境配置
在 `admin/.env` 文件中配置：
```env
VITE_BACKEND_URL=http://localhost:4000
```

### 4. 启动应用

#### 方法一：分别启动各个服务

**启动后端服务** (端口: 4000)
```bash
cd backend
npm run dev
```

**启动前端应用** (端口: 5173)
```bash
cd frontend
npm run dev
```

**启动管理面板** (端口: 5174)
```bash
cd admin
npm run dev
```

#### 方法二：使用并发启动 (推荐)

在根目录安装并发工具：
```bash
npm install -g concurrently
```

然后运行：
```bash
npm run dev
```

### 5. 访问应用

- **前端用户界面**: http://localhost:5173
- **管理员面板**: http://localhost:5174
- **后端API**: http://localhost:4000

## 功能特性

### 前端功能
- 用户注册/登录
- 商品浏览和搜索
- 购物车管理
- 订单下单
- 用户订单历史
- 响应式设计

### 后端功能
- 用户认证和授权
- 商品CRUD操作
- 购物车管理
- 订单处理
- 图片上传 (Cloudinary)
- 支付处理 (Stripe)

### 管理面板功能
- 管理员登录
- 商品添加/删除
- 商品列表管理
- 订单管理和状态更新
- 图片上传

## API接口

### 用户相关
- `POST /api/user/register` - 用户注册
- `POST /api/user/login` - 用户登录
- `POST /api/user/admin` - 管理员登录

### 商品相关
- `GET /api/product/list` - 获取商品列表
- `POST /api/product/add` - 添加商品 (需要管理员权限)
- `POST /api/product/remove` - 删除商品 (需要管理员权限)
- `POST /api/product/single` - 获取单个商品详情

### 购物车相关
- `POST /api/cart/get` - 获取用户购物车
- `POST /api/cart/add` - 添加商品到购物车
- `POST /api/cart/update` - 更新购物车商品数量

### 订单相关
- `POST /api/order/place` - 下单 (货到付款)
- `POST /api/order/stripe` - 下单 (Stripe支付)
- `POST /api/order/userorders` - 获取用户订单
- `POST /api/order/list` - 获取所有订单 (管理员)
- `POST /api/order/status` - 更新订单状态 (管理员)

## 部署说明

### 生产环境配置

1. **数据库**: 使用MongoDB Atlas或自建MongoDB服务
2. **图片存储**: 配置Cloudinary账户
3. **支付**: 配置Stripe生产环境密钥
4. **域名**: 更新环境变量中的URL配置

### 构建生产版本

```bash
# 构建前端
cd frontend
npm run build

# 构建管理面板
cd ../admin
npm run build

# 启动后端生产服务
cd ../backend
npm start
```

## 故障排除

### 常见问题

1. **端口冲突**: 确保端口4000, 5173, 5174没有被其他应用占用
2. **数据库连接失败**: 检查MongoDB连接字符串和网络连接
3. **图片上传失败**: 验证Cloudinary配置信息
4. **支付失败**: 检查Stripe密钥配置

### 日志查看

- 后端日志: 查看终端输出
- 前端错误: 打开浏览器开发者工具Console
- 网络请求: 查看Network标签

## 贡献指南

1. Fork项目
2. 创建功能分支 (`git checkout -b feature/AmazingFeature`)
3. 提交更改 (`git commit -m 'Add some AmazingFeature'`)
4. 推送到分支 (`git push origin feature/AmazingFeature`)
5. 打开Pull Request

## 许可证

本项目采用MIT许可证 - 查看 [LICENSE](LICENSE) 文件了解详情。
