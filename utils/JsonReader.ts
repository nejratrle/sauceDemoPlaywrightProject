import fs from 'fs'
import path from 'path'

type UserData = {
    username: string
    password: string
    firstName: string
    lastName: string
    postalCode: string
}

type UsersFile = {
    users: Record<string, UserData>
}

class JsonReader {
    private static getJsonData(): UsersFile {
        const filePath = path.join(__dirname, '../test-data/users.json')
        const rawData = fs.readFileSync(filePath, 'utf-8')
        return JSON.parse(rawData)
    }

    static getUserDetails(userType: string): UserData {
        const data = this.getJsonData()
        const user = data.users[userType]

        if (!user) {
            throw new Error(`User '${userType}' not found in JSON data.`)
        }

        return user
    }
}

export default JsonReader
