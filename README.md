# Family Budget Tracker Application
This Java-based application is backed by a REST API and a frontend, designed to help families track their expenses and manage their income.

Note: This Family Budget Tracker application is only built for training and educational purposes. It is not intended for commercial or production use.

## Features
The Family Budget Tracker application allows users to:

* Register for an account and log in securely
* Add and manage family members
* Add and manage expense categories
* Record and track expenses for each family member and category
* Download and view scanned copies of checks
* View and filter expense reports by date range, family member, and category
* Set and monitor income limits for each category

## Technologies Used
The Family Budget Tracker application was created using a microservice architecture, where the following services are used:
* User registration and authentication
* Storage and provision of directories and basic data
* Storage and provision of scanned copies of checks
* Client interface

The application is built using the following technologies:

* Java 17
* Spring Data JPA
* Hibernate
* PostgreSQL
* MongoDB
* HTML5/CSS3
* React JS
* Nginx

# Prerequisites
Before running the application, you will need to have the following software installed on your machine:

* Java Development Kit (JDK) 17 or higher
* Docker

# Getting Started
To run the application locally, follow these steps:

1. Clone the repository to your local machine:
```bash
git clone https://github.com/BRuslanB/family-budget.git
```
2. Launch:
```bash
docker-compose up
```

## Contributing
If you would like to contribute to developing this application, please submit a pull request or open an issue on the GitHub repository.

## License
This application is licensed under the MIT License. See the LICENSE file for more details.
