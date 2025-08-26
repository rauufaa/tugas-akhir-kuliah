import prisma from "../connection"
export default function addressRepository() {
    const add = (address) => {
        const results = prisma.address.create({
            data: {
                state: address.getState(),
                city: address.getCity(),
                street_name: address.getStreetName(),
                street_number: address.getStreetNumber(),
                postcode: address.getPostcode(),
            }
        })
        return results

    }

    return {
        add
    }
}