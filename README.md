# SMART-on-FHIR starter app using ViteJS, ReactJS

This is a SMART-on-FHIR starter application built with React, Vite, and TypeScript. It provides a foundation for building healthcare applications that integrate with Electronic Health Record (EHR) systems using the SMART-on-FHIR standard. The app supports integration with both Epic and Cerner FHIR servers.

## Features

- SMART-on-FHIR authentication flow
- Support for multiple FHIR servers (Epic and Cerner)
- Dynamic EHR selection via URL parameter
- React Router for navigation
- TypeScript support
- Modern development environment with Vite

## Getting Started

### Prerequisites

- Node.js (LTS version)
- Yarn package manager

### Installation

1. Clone the repository:

```bash
git clone [your-repo-url]
cd smart-on-fhir-react-starter
```

2. Install dependencies:

```bash
yarn install
```

3. Configure the application:
   - Open `src/lib/smart.ts`
   - Replace `my-client-id` with your SMART app client ID for the respective server
   - The app supports both Epic and Cerner FHIR servers out of the box

### Server Configuration

#### Epic FHIR

1. Register your application at <https://fhir.epic.com/Developer/Apps>
2. Get your client ID and update it in `smart.ts`
3. Configure your redirect URI in Epic's portal
4. Default Epic FHIR endpoint: `https://fhir.epic.com/interconnect-fhir-oauth/api/FHIR/R4`

#### Cerner FHIR

1. Register your application at <https://code.cerner.com/developer/smart-on-fhir>
2. Get your client ID and update it in `smart.ts`
3. Configure your redirect URI in Cerner's portal
4. Default Cerner FHIR endpoint: `https://fhir-open.cerner.com/r4/ec2458f2-1e24-41c8-b71b-0e701af7583d`

### Development

Start the development server:

```bash
yarn dev
```

The application will be available at `https://localhost:5000`

### Testing the App

1. Launch the app with the appropriate parameters:
   - For Epic: `https://localhost:5000/launch?apptoken=epic-sandbox&launch=[launch_token]&iss=https://fhir.epic.com/interconnect-fhir-oauth/api/FHIR/R4`
   - For Cerner: `https://localhost:5000/launch?apptoken=cerner-sandbox&launch=[launch_token]&iss=https://fhir-open.cerner.com/r4/ec2458f2-1e24-41c8-b71b-0e701af7583d`
2. The app will automatically detect the EHR system and use the provided launch context
3. After successful authentication, you'll be redirected back to the application

Note: The `launch` and `iss` parameters are provided by the EHR system when launching the app. These parameters are required and contain the context information needed for the SMART-on-FHIR launch sequence.

### Required URL Parameters

- `apptoken` - Identifies the EHR system (`epic-sandbox` or `cerner-sandbox`)
- `launch` - The launch token provided by the EHR system
- `iss` - The FHIR server URL (issuer) that the app should connect to

### Example FHIR Server URLs (iss)

#### Epic

- Sandbox: `https://fhir.epic.com/interconnect-fhir-oauth/api/FHIR/R4`
- Production: Your Epic organization's FHIR server URL

#### Cerner

- Sandbox: `https://fhir-open.cerner.com/r4/ec2458f2-1e24-41c8-b71b-0e701af7583d`
- Production: Your Cerner organization's FHIR server URL

### Supported apptoken Values

- `epic-sandbox` or `epic` - For Epic FHIR server
- `cerner-sandbox` or `cerner` - For Cerner FHIR server

## Project Structure

- `src/lib/smart.ts` - FHIR client configuration with support for multiple servers
- `src/components/Launch.tsx` - SMART launch component with EHR detection
- `src/components/LaunchCallback.tsx` - OAuth callback handler
- `src/App.tsx` - Main application component with routing

## Available Scripts

- `yarn dev` - Start development server
- `yarn build` - Build for production
- `yarn preview` - Preview production build locally

## Resources

- [SMART on FHIR Documentation](http://hl7.org/fhir/smart-app-launch/)
- [Epic FHIR Documentation](https://fhir.epic.com/)
- [Cerner FHIR Documentation](https://code.cerner.com/developer/smart-on-fhir)
- [FHIR Client Library](https://github.com/smart-on-fhir/client-js)
- [React Documentation](https://react.dev)
- [Vite Documentation](https://vitejs.dev)

## License

MIT
