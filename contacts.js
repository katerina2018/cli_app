const fs=require("fs/promises");
const path =require("path");
const { nanoid } = require("nanoid");
const contactsPath=path.join(__dirname, "./db/contacts.json")


async function getDb() {
    const dbRaw = await fs.readFile(contactsPath);
    const db = JSON.parse(dbRaw);
    return db;
  }

async function listContacts() {
    const db = await getDb();
    return db;
  }
  
  async function getContactById(contactId) {
    const db = await getDb();
    const contact = db.find((item)=>item.id===contactId)
    if(!contact){
      return null
    }
    return contact
  }
  
  async function removeContact(contactId) {
    const db = await getDb();
    
    const contacts= db.filter((item)=> item.id !== contactId)
    
    await fs.writeFile(contactsPath, JSON.stringify(contacts))
    return contacts
  }
  
  async function addContact(name, email, phone) {
    const id =nanoid();
    const newContact = {id, name, email, phone}
    const db= await getDb();
    db.push(newContact)
    await fs.writeFile(contactsPath, JSON.stringify(db))
    return newContact
  }
  module.exports = {
    listContacts,
    addContact,
    removeContact,
    getContactById,
  };