# install dependencies
npm install

# your must create a db in postgreSQL with the name pulpo_db_test

# make migrations
npx sequelize-cli db:migrate

# start the project
npm start

# routes available
# 
# -> get all users
localhost:3000/user

# -> get user by id
localhost:3000/user/some_nomber

# create new token
localhost:3000/user/create_token_hedera

# tokens list
localhost:3000/user/users_tokens

# login
localhost:3000/auth/login

# register
localhost:3000/auth/register

# change password
localhost:3000/auth/change_password/some_nomber