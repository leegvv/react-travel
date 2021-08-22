# 第一个阶段：拉取node镜像来打包React项目
FROM node:14 as build
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY tsconfig*.json ./
COPY craco.config.js ./
COPY public public/
COPY src src/
RUN npm run build

# 第二个阶段： 创建nginx服务器， 将打包好的文件复制到服务器文件夹中，运行Ngnix服务器
FROM nginx:alpine
COPY --from=build /app/build/ usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]


