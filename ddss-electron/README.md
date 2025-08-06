# CBIS-DDSM Analyzer Electron

This is a Electron + React + Vite that implements a viewer of cbis-ddsm photos viewer.
The goal is to allow simple access to mammography photos.

## Pre-Requisites

To use the following project, please make sure you have the following installed:

- [node](https://nodejs.org/en)
- [Server](https://github.com/DDSM-CBIS/ddsm-server)

- Clone the repository:

```bash
git clone https://github.com/DDSM-CBIS/ddsm-electron.git
```

## Usage

Install requirements:

```bash
npm i
```

Run the application on development mode:

```bash
npm run dev
```

## Key Features

The Electron program is designed with several core functionalities to enhance the accessibility of the CBIS-DDSM dataset:

### Filtering Options

Users can filter patients by parameters based on the metadata unique values. The parameters are not “hard-coded”, and taken directly from the dataset, to allow the most flexibility and up-to-date information. This allows researchers to narrow down the dataset based on their specific needs.

### Viewing Patient Details and Images

Users can view patients along with their corresponding mammography images (in reduced resolution for faster loading). For each patient, all abnormalities, along with their Region of Interest (ROI) and mask images, are displayed.

### Saving and Loading Queries

The program allows users to save frequently used queries, enabling quick re-filtering without having to manually input the parameters each time.
