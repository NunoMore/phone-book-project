class NodeApi {

    static readEntries = (filter) => {
        let url = 'http://localhost:3001/read';
        if (filter) url = url + '?filter=' + filter; // ready to receive a filter but it was created a filter in the front-end
        return this.fetchData(url);
    }

    static addNewEntry = (newEntry) => {
        newEntry.firstName.includes(' ') && newEntry.firstName.split(' ').map((piece) => piece + '%20').join();
        let url = 'http://localhost:3001/create' +
            "?firstName=" + newEntry.firstName +
            "&lastName=" + newEntry.lastName +
            "&number=" + newEntry.phoneNumber;
        return this.fetchData(url);
    }

    static editEntry = (newEntry) => {
        let url = 'http://localhost:3001/update' +
            "?firstName=" + newEntry.firstName +
            "&lastName=" + newEntry.lastName +
            "&number=" + newEntry.phoneNumber +
            "&nameId=" + newEntry.nameId;
        return this.fetchData(url);
    }

    static deleteEntry = (number) => {
        let url = 'http://localhost:3001/delete?number=' + number;
        return this.fetchData(url);
    }

    static fetchData = (url) => {
        return fetch(url)
            .then(res => res.json())
            .then((data) => {
                console.log("Data Fetched");
                if (data.sqlMessage) {
                    return {
                        success: data.success,
                        sqlMessage: data.sqlMessage
                    };
                }
                if (data.success)
                    return {
                        success: data.success
                    };
                else return this.parseData(data);
            })
            .catch(console.log)
    }

    static parseData = (data) => {
        let parsedObjs = [];
        data.forEach(dataElement => {
            let parsedObj = {};
            if (dataElement.id)
                parsedObj.nameId = dataElement.id;
            if (dataElement.first_name)
                parsedObj.firstName = dataElement.first_name;
            if (dataElement.last_name)
                parsedObj.lastName = dataElement.last_name;
            if (dataElement.number)
                parsedObj.phoneNumber = dataElement.number;
            parsedObjs.push(parsedObj);
        });
        return parsedObjs;
    }
}

export default NodeApi;

