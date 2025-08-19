# BackEndNodeJs
- cd vào Project, chạy npm i, sau đó npm start
- Vào mongodb, tạo 1 database (Ví dụ: database-A), trong database tạo 1 connects tên là products
- Thêm data trong file database.txt vào connect products
- Mongodb sẽ tự thêm id vào từng object nên bạn không cần lo không có id
- Ví dụ cho file .env:
PORT=3000
MONGO_URL=mongodb://localhost:27017/database-A