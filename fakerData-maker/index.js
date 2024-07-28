import { fakerID_ID } from '@faker-js/faker';
import fs from "fs/promises";

const dataJSON = []
let dataCSV = "user_id,first_name,last_name,bio,phone_number,email,gender\n"

for (let i = 0; i < 10000; i++) {

    const newData = {
        user_id: fakerID_ID.string.nanoid(7),
        first_name: fakerID_ID.person.firstName(),
        last_name: fakerID_ID.person.lastName(),
        bio: fakerID_ID.person.bio(),
        phone_number: fakerID_ID.phone.number(),
        email: fakerID_ID.internet.email(),
        gender: Math.round((Math.random() * 10)) < 5 ? "M" : "F",
    }

    // make json file
    dataJSON.push(
        newData
    )
    
    // make csv file
    dataCSV = dataCSV + `${newData.user_id},${newData.first_name},${newData.last_name},${newData.bio},${newData.phone_number},${newData.email},${newData.gender}\n`;
}

async function main() {
    try {
        await fs.writeFile('data/UserDataTest.json', JSON.stringify(dataJSON));
        await fs.writeFile('data/UserDataTest.csv', dataCSV);
    } catch (err) {
        console.log(err);
    }
}


main()
