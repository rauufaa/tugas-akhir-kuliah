import { faker, fakerID_ID } from '@faker-js/faker';
import fs from "fs/promises";

const dataJSON = []
let dataCSV = "user_id|first_name|last_name|bio|phone_number|email|gender\n"

function uderDataGenerator() {
    
    for (let i = 1; i <= 150000; i++) {
        let digits = '0123456789';
        let phoneNumber = "08";
        const firstName = fakerID_ID.person.firstName();
        const lastName = fakerID_ID.person.lastName();
        for (let j = 0; j < 10; j++) {
            phoneNumber += digits[Math.floor(Math.random() * digits.length)]
        }
        const newData = {
            user_id: i,
            first_name: firstName,
            last_name: lastName,
            bio: fakerID_ID.person.bio(),
            phone_number: phoneNumber,
            email: faker.internet.email({firstName: firstName.toLowerCase(), lastName: lastName.toLowerCase(), provider: "example.com"}),
            gender: Math.round((Math.random() * 10)) < 5 ? "M" : "F",
        }
    
        // make json file
        dataJSON.push(
            newData
        )
        
        // make csv file
        dataCSV = dataCSV + `${newData.user_id}|${newData.first_name}|${newData.last_name}|${newData.bio}|${newData.phone_number}|${newData.email}|${newData.gender}\n`;
    }
}




async function main() {
    uderDataGenerator()
    try {
        await fs.writeFile('data/UserDataTest.json', JSON.stringify(dataJSON));
        await fs.writeFile('data/UserDataTest.csv', dataCSV);
        return console.log("Success make data faker");
    } catch (err) {
        console.log(err);
    }
}


main()
