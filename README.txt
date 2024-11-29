Setup and Run Instructions
1. Install Dependencies

After pulling the repository, navigate to your project directory and run:

yarn install

2. Start Docker Containers

Run the following command to start the Docker containers:

docker compose up -d

4. Verify the Setup

    Check Docker Containers: Ensure containers are running with:

docker ps

4. Configure and Run Flyway Migrations

    Navigate to the Flyway directory:

cd path/to/flyway

Replace path/to/flyway with the actual path to your Flyway directory.

Update the flyway.locations property:

    Open the flyway.conf file located in src folder.

    Update the flyway.locations property to point to your SQL migration files. For example:

    flyway.locations=filesystem:path/to/src/sql

    Replace path/to/src/sql with the appropriate path to your SQL folder. This folder should contain the SQL migration scripts.

Run the Flyway migration command:

    ./flyway  -configFiles="../../src/flyway.local.conf" migrate



