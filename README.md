# Power Pages GDS Accelerator
This repository contains the exported files of a Power Pages site. Follow the steps below to quickly set up a Power Pages project that is compliant with the GDS standards.

Refer to https://design-system.service.gov.uk/ for further information.

## Prerequisites

- Power Apps CLI installed
- Access to a Power Platform environment

## Steps to Import the Site

1. **Clone the Repository**
   - git clone https://github.com/SooryaSu/Power-Pages-GDS-Accelerator.git
   - cd your-repo-directory

2. **Authenticate with Power Platform**
   - Find the [environment URL](https://learn.microsoft.com/en-us/power-platform/admin/edit-properties-environment) for your destination
   - pac auth create --url https://your-environment-url

4. **Import the Site**
- pac paportal upload --path ./path-to-exported-files

4. **Verify the Import**
- Navigate to your Power Platform environment.
- Go to Apps and verify that your Power Pages site appears in the list.

## Troubleshooting
If you encounter any issues during the import, refer to the Power Apps CLI documentation for detailed troubleshooting steps.

## Contributing
Feel free to open issues or submit pull requests if you have any improvements or suggestions.
