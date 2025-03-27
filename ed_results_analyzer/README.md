# ED Results Analyzer

A comprehensive web application for Emergency Department physicians and staff to manage patient follow-up for discharged patients with abnormal lab or imaging results.

## Features

### Core Features
- **AI-Powered Analysis**: Automatically analyze lab and imaging results to identify abnormal findings requiring follow-up
- **Automated Patient Communication**: Secure, HIPAA-compliant messaging system to notify patients of results
- **Real-time Analytics**: Comprehensive dashboards to track follow-up rates and patient outcomes
- **EHR Integration**: Seamless integration with major healthcare systems
- **HIPAA Compliance**: Enterprise-grade security with full compliance and audit trails

### Enhanced Features
- **Secure User Authentication**: Role-based access control with JWT authentication
- **Patient Dashboard**: View and manage patients requiring follow-up
- **Detailed Patient View**: Comprehensive view of patient data, including lab results, imaging, and medical history
- **Follow-Up Management**: Track and update follow-up status for abnormal results

## Technology Stack

- **Frontend**: React.js, React Router, Tailwind CSS
- **Authentication**: JWT (JSON Web Tokens)
- **Data Visualization**: Chart.js (for analytics)
- **Testing**: Jest, React Testing Library

## Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/ed-results-analyzer.git
cd ed-results-analyzer
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm start
```

4. Open [http://localhost:3002](http://localhost:3002) to view the application in your browser.

## Project Structure

```
ed_results_analyzer/
├── public/                 # Public assets
├── src/                    # Source files
│   ├── api/                # API and mock data
│   │   └── mock/          # Mock data for development
│   ├── components/         # React components
│   │   ├── auth/          # Authentication components
│   │   ├── dashboard/     # Dashboard components
│   │   ├── layout/        # Layout components
│   │   ├── patient/       # Patient-related components
│   │   └── ...            # Other components
│   ├── context/           # React context providers
│   ├── hooks/             # Custom React hooks
│   ├── services/          # Service layer for business logic
│   ├── utils/             # Utility functions
│   ├── App.js             # Main application component
│   └── index.js           # Application entry point
├── package.json           # Project dependencies
├── tailwind.config.js     # Tailwind CSS configuration
└── README.md              # Project documentation
```

## Authentication

The application includes a secure authentication system with role-based access control:

- **Admin**: Full access to all features and patient data
- **Staff**: Access to assigned patients and limited features

### Demo Accounts

For testing purposes, the following accounts are available:

- **Admin**: Username: `admin`, Password: `password123`
- **Doctor**: Username: `doctor`, Password: `password123`
- **Nurse**: Username: `nurse`, Password: `password123`

## EHR Integration

The application is designed to integrate with Electronic Health Record (EHR) systems like Epic. Currently, it uses mock data for demonstration purposes.

To switch from mock data to a real EHR integration:

1. Implement the API client in `src/services/ehrService.js`
2. Update the patient service to use the EHR service instead of mock data
3. Configure the API endpoints and authentication in your environment variables

## Testing

The application includes a basic test suite for the authentication flow. To run the tests:

```bash
npm test
```

To run tests with coverage:

```bash
npm test -- --coverage
```

## Deployment

To build the application for production:

```bash
npm run build
```

This will create a `build` directory with optimized production files that can be deployed to any static hosting service.

## Future Enhancements

- **Real-time Notifications**: Implement WebSockets for real-time alerts
- **Mobile Application**: Develop a companion mobile app for on-the-go access
- **Advanced Analytics**: Add predictive analytics for patient outcomes
- **Automated Documentation**: Generate follow-up documentation for EHR systems

## License

[MIT](https://choosealicense.com/licenses/mit/)

## Contact

For more information, please contact:

- Email: info@edresultsanalyzer.com
- Phone: +1 (800) 555-1234 