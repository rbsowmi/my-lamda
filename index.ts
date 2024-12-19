import { Context, APIGatewayProxyResult, APIGatewayEvent } from 'aws-lambda';

export const handler = async (event: APIGatewayEvent, context: Context): Promise<APIGatewayProxyResult> => {
  console.log(`Event: ${JSON.stringify(event, null, 2)}`);
  console.log(`Context: ${JSON.stringify(context, null, 2)}`);
  return {
      statusCode: 200,
      body: JSON.stringify({
          message: 'hello world !',
      }),
   };
};



// import { DynamoDBClient, PutItemCommand, GetItemCommand } from '@aws-sdk/client-dynamodb';
// import crypto from 'crypto';
// const client = new DynamoDBClient({ region: 'ap-south-1' });
// const uniqueid = (): string => {
//     const randomnum = Math.floor(10000 + Math.random() * 9000).toString();
//     return randomnum;
// }
// interface UserData {
//     username: string;
//     email: string;
//     password: string;
//     role: 'admin' | 'user';
//     userid?: string;
// }
// export const handler = async (event: any) => {
//     const createUser = async (userData: UserData) => {
//         const encryptedPassword = crypto.createHash('sha256').update(userData.password).digest('hex');
//         userData.password = encryptedPassword;
//         userData.userid = uniqueid();
//         const params = {
//             TableName: 'projects',
//             Item: {
//                 username: { S: userData.username },
//                 email: { S: userData.email },
//                 password: { S: userData.password },
//                 role: { S: userData.role },
//                 userid:{S:userData.userid}
//             }
//         };

//         const command = new PutItemCommand(params);

//         const result = await client.send(command);

//     };

//     try {
//         const { httpMethod, path, body } = event;
//         if (httpMethod === 'POST') {
//             const userData: UserData = JSON.parse(body);
//             const userRegex = /^[a-zA-Z0-9_-]{3,20}$/;
//             const emailRegex = /^[a-z0-9._%+-]{1,30}@gmail\.com$/;
//             const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@!#$%^&*])[a-zA-Z\d@!#$%^&*]{8,12}$/;
//             const roles = ['admin', 'user'];
//             const allowedFields: string[] = ['username', 'email', 'password', 'role'];
//             const invalidFields = Object.keys(userData).filter(field => !allowedFields.includes(field));
//             if (invalidFields.length > 0) {
//                 return {
//                     statusCode: 400,
//                     body: JSON.stringify({ message: `${invalidFields} are not allowed.` })
//                 };
//             }
//             if (!body) {
//                 return {
//                     statusCode: 400,
//                     body: JSON.stringify({ message: "Request body is empty" })
//                 };
//             }
//             if (!userData.role) {
//                 return {
//                     statusCode: 400,
//                     body: JSON.stringify({ message: "Role is required" })
//                 };
//             }
//             if (!roles.includes(userData.role)) {
//                 return {
//                     statusCode: 400,
//                     body: JSON.stringify({ message: "admin or user roles are allowed" })
//                 };
//             }
//             if (!userData.username) {
//                 return {
//                     statusCode: 400,
//                     body: JSON.stringify({ message: "Username is required" })
//                 };
//             }

//             if (!userRegex.test(userData.username)) {
//                 return {
//                     statusCode: 400,
//                     body: JSON.stringify({ message: "Username is  invalid " })
//                 };
//             }

//             if (!userData.email) {
//                 return {
//                     statusCode: 400,
//                     body: JSON.stringify({ message: "Email is required" })
//                 };
//             }

//             if (!emailRegex.test(userData.email)) {
//                 return {
//                     statusCode: 400,
//                     body: JSON.stringify({ message: "Email is invalid" })
//                 };
//             }

//             if (!userData.password) {
//                 return {
//                     statusCode: 400,
//                     body: JSON.stringify({ message: "Password is required" })
//                 };
//             }

//             if (!passwordRegex.test(userData.password)) {
//                 return {
//                     statusCode: 400,
//                     body: JSON.stringify({ message: "Password is in an invalid" })
//                 };
//             }

//             const getParams = {
//                 TableName: 'User',
//                 Key: { email: { S: userData.email } }
//             };
//             const getCommand = new GetItemCommand(getParams);
//             const exist = await client.send(getCommand);

//             if (exist.Item && exist.Item.email) {
//                 return {
//                     statusCode: 400,
//                     body: JSON.stringify({
//                         message: 'Email already exists'
//                     })
//                 };
//             }

//             const res = await createUser(userData);
//             return {
//                 statusCode: 201,
//                 body: JSON.stringify({ message: "User created successfullys", userData })
//             };

//         }
//     } catch (error) {
//         return {
//             statusCode: 500,
//             body: JSON.stringify({
//                 message: "Internal Server Error"
//             })
//         };
//     }
// };

