// const fs = require("fs").promises;
// const path = require("path");
// const fs = require("fs");
import * as fs from "fs";
import path from "path";
import shortid from "shortid";

const __dirname = path.resolve();
const contactsPath = path.join(__dirname, "./db", "./contacts.json");
// console.log(contactsPath);
// console.log(__dirname);

export function listContacts() {
  fs.readFile(contactsPath, "utf-8", (error, data) => {
    if (error) throw error;
    console.table(JSON.parse(data));
  });
}

export function getContactById(contactId) {
  fs.readFile(contactsPath, "utf-8", (error, data) => {
    if (error) throw error;
    const contactsList = JSON.parse(data);

    const contact = contactsList.find((contact) => {
      if (contact.id === contactId) {
        console.log("Contact By ID: ", contact);
        return contact;
      }
    });

    if (!contact) console.log(`Contact with ID "${contactId}" not found!`);
  });
}

export function removeContact(contactId) {
  fs.readFile(contactsPath, "utf-8", (error, data) => {
    if (error) throw error;

    const contactsList = JSON.parse(data);

    const newContactsList = contactsList.filter(
      (contact) => contact.id !== contactId
    );

    if (newContactsList.length === contactsList.length) {
      console.log(
        `Contact with ID "${contactId}" don't removed! ID "${contactId}" not found!`
      );
      return;
    }

    console.log(
      `Contact id "${contactId}" deleted successfully! New list of contacts: `
    );
    console.table(newContactsList);

    fs.writeFile(contactsPath, JSON.stringify(newContactsList), (error) => {
      if (error) throw error;
    });
  });
}

export function addContact(name, email, phone) {
  fs.readFile(contactsPath, "utf-8", (error, data) => {
    if (error) throw error;
    const contactList = JSON.parse(data);

    const newContact = {
      id: shortid(),
      name,
      email,
      phone,
    };
    contactList.push(newContact);
    console.table(contactList);
  });
}

// export default {
//   listContacts,
//   getContactById,
//   removeContact,
//   addContact,
// };
