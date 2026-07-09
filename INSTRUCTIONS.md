# Hướng Dẫn Biên Dịch, Deploy và Chạy Script Test trong ac-hardhat-template

Tài liệu này hướng dẫn cách build, deploy các contract (`Counter`, `MyToken`, `MyNFT`) và chạy các script tương tác tương ứng trong thư mục `scripts/`.

---

## 1. Đồng bộ Cấu hình Môi trường (`.env`)
Đảm bảo file `.env` ở thư mục gốc của dự án đã cấu hình đúng thông tin:
```env
TESTNET_PRIVATE_KEY=0x... (Private key của ví test)
SEPOLIA_RPC_URL=https://... (RPC URL của mạng Sepolia)
```

---

## 2. Biên dịch Smart Contract (Compile)
Chạy lệnh sau để biên dịch toàn bộ contract Solidity và tạo ra Typechain Types:
```bash
npx hardhat compile
```

---

## 3. Deploy Contract lên mạng Sepolia Testnet
Chạy deploy tương ứng với từng contract:

* **Deploy Counter**:
  ```bash
  npx hardhat deploy --network sepolia --tags Counter --reset
  ```
* **Deploy MyToken**:
  ```bash
  npx hardhat deploy --network sepolia --tags MyToken --reset
  ```
* **Deploy MyNFT**:
  ```bash
  npx hardhat deploy --network sepolia --tags MyNFT --reset
  ```

*Sau khi deploy thành công, hãy copy địa chỉ contract hiển thị ở Terminal để cấu hình cho các file script dưới đây.*

---

## 4. Chạy Script Tương tác (Test) trên Sepolia
Trước khi chạy, hãy mở file script tương ứng trong thư mục `scripts/` và cập nhật địa chỉ contract vừa deploy vào hằng số `contractAddress`.

Sau đó chạy lệnh:

### 4.1. Test Counter
Script này tương tác bằng Hardhat (tự động load mạng):
```bash
npx hardhat run scripts/test_counter.ts --network sepolia
```

### 4.2. Test MyToken
Script này chạy trực tiếp bằng `ts-node`:
```bash
npx ts-node scripts/test_mytoken.ts
```

### 4.3. Test MyNFT
Script này chạy trực tiếp bằng `ts-node`:
```bash
npx ts-node scripts/test_mynft.ts
```
