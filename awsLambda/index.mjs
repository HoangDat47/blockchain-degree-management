import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import {
  DynamoDBDocumentClient,
  ScanCommand,
  PutCommand,
  GetCommand,
  DeleteCommand,
} from "@aws-sdk/lib-dynamodb";

const client = new DynamoDBClient({});
const dynamo = DynamoDBDocumentClient.from(client);
const tablename = "student";

const getStudent = async (id) => {
  const result = await dynamo.send(
    new GetCommand({
      TableName: tablename,
      Key: { id: Number(id) },
    })
  );
  return result.Item || { message: "not found" };
};

const getAllStudents = async () => {
  const result = await dynamo.send(
    new ScanCommand({
      TableName: tablename,
    })
  );
  return result.Items;
};

const putStudent = async (student) => {
  await dynamo.send(
    new PutCommand({
      TableName: tablename,
      Item: {
        id: Number(student.id),
        studentID: student.studentID,
        name: student.name,
        gender: student.gender,
        gmail: student.gmail,
        phone: student.phone,
        address: student.address,
      },
    })
  );
  return `PUT student ${student.id}`;
};

const deleteStudent = async (id) => {
  await dynamo.send(
    new DeleteCommand({
      TableName: tablename,
      Key: { id: Number(id) },
    })
  );
  return `Deleted Student ${id}`;
};

export const handler = async (event) => {
  let body;
  let statusCode = 200;
  const headers = {
    "Content-Type": "application/json",
  };

  try {
    switch (event.routeKey) {
      case "GET /students/{id}":
        body = await getStudent(event.pathParameters.id);
        break;
      case "GET /students":
        body = await getAllStudents();
        break;
      case "PUT /students":
        const data = JSON.parse(event.body);
        body = await putStudent(data);
        break;
      case "DELETE /students/{id}":
        body = await deleteStudent(event.pathParameters.id);
        break;
      default:
        throw new Error(
          `unSupported route: ${event.routeKey}`
        );
    }
  } catch (error) {
    statusCode = 400;
    body = error.message;
  } finally {
    body = JSON.stringify(body);
  }

  return {
    statusCode,
    body,
    headers,
  };
};