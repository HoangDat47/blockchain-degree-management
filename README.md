# Blockchain Degree Management

This project is a blockchain-based degree management system that allows authorized providers to add and manage degrees. The system uses a smart contract deployed on the blockchain to ensure the integrity and authenticity of the degree records.

## Getting Started

### Prerequisites

Make sure you have the following installed on your machine:

- [Node.js](https://nodejs.org/) (version 14.x or later)
- [pnpm](https://pnpm.io/)

### Installation

First, install pnpm if you haven't already:

```bash
npm install -g pnpm
```

Next, clone the repository and install the dependencies:

```bash
git clone https://github.com/your-username/blockchain-degree-management.git
cd blockchain-degree-management
pnpm install
```

### Environment Variables

Create a `.env.local` file in the root of your project and add the following environment variables:

```bash
# .env.local
PINATA_JWT=your_pinata_jwt
NEXT_PUBLIC_GATEWAY_URL=your_gateway_url
NEXT_PUBLIC_API_URL=your_api_url
CONTRACT_ADDRESS=your_contract_address
CONTRACT_ADDRESS_2=your_contract_address_2
```

Replace `your_pinata_jwt`, `your_gateway_url`, `your_api_url`, `your_contract_address`, and `your_contract_address_2` with your actual values.

### Running the Development Server

To start the development server, run:

```bash
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

### Building for Production

To build the project for production, run:

```bash
pnpm build
```

This will create an optimized production build in the `out` directory.

### Running in Production Mode

To run the project in production mode, run:

```bash
pnpm start
```

### Using the Application

1. **Connect Wallet**: Open the application and connect your wallet.
2. **Authorize Provider**: If you are the contract owner, you can authorize a provider by entering their address and clicking "Authorize Provider".
3. **Add Degree**: As an authorized provider, you can add a degree by entering the degree details and uploading the degree file.
4. **Search Degree**: You can search for a degree by entering the degree ID and clicking "Search Degree".

### Updating ABI and Contract Address

To update the ABI and contract address, follow these steps:

1. **Update ABI**: Replace the content of the `contractABI.json` file with the new ABI.
   ```json
   // ./src/app/(dashboard)/degree/contractABI.json
   {
     "abi": [
       // ...new ABI content...
     ]
   }
   ```

2. **Update Contract Address**: Update the contract address in the `degree.tsx` file.
   ```tsx
   // ./src/app/(dashboard)/degree/degree.tsx
   const contractAddress = process.env.CONTRACT_ADDRESS;
   ```

### API Endpoints

Here are the API endpoints used in the project:

1. **Fetch Students**: Fetch the list of students.
   ```bash
   GET ${process.env.NEXT_PUBLIC_API_URL}/student
   ```

2. **Fetch Degree Records**: Fetch the degree records by degree ID.
   ```bash
   GET ${process.env.NEXT_PUBLIC_API_URL}/degree/{degreeId}
   ```

3. **Upload File to Pinata**: Upload a file to Pinata and get the IPFS hash and URL.
   ```bash
   POST https://api.pinata.cloud/pinning/pinFileToIPFS
   ```

### Project Images

Here are some images related to the project:

#### AWS API Gateway
![AWS API Gateway](./public/preview/awsApiGateway.png)

#### AWS Lambda
![AWS Lambda](./public/preview/awsLambda.png)

#### Degree Manager
![Degree Manager](./public/preview/degreeManager.png)

#### Degree View
![Degree View](./public/preview/degreeView.png)

#### Student API
![Student API](./public/preview/StudentApi.png)

### Contributing

Contributions are welcome! Please open an issue or submit a pull request for any improvements or bug fixes.

### License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.