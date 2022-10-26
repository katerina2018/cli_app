const { Command } = require("commander");
const program = new Command();
program
  .option("-a, --action <type>", "choose action")
  .option("-i, --id <type>", "user id")
  .option("-n, --name <type>", "user name")
  .option("-e, --email <type>", "user email")
  .option("-p, --phone <type>", "user phone");

program.parse(process.argv);

const argv = program.opts();


const contacts = require("./contacts.js");

async function invokeAction({ action, id, name, email, phone }) {
    
  switch (action) {
    case "list":
        const contactsList = await contacts.listContacts();
        
          console.table(contactsList);
break;

    case "get":
      const contactGet= await contacts.getContactById(id)
      console.log(contactGet)
      break;

    case "add":
      await contacts.addContact(name, email, phone)
      break;

    case "remove":
      await contacts.removeContact(id)
      break;

    default:
      console.warn("\x1B[31m Unknown action type!");
  }
}

invokeAction(argv);