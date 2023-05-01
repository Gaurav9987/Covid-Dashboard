const COVID_API_BASE = 'https://api.covid19api.com/';

const covidApi = {
    getSummary: async () => {
        return await fetchRequest(covidApiEndpoint.summary());
    },
    getWorldAllTimeCases: async () => {
        return await fetchRequest(covidApiEndpoint.worldAllTimeApiCases());
    },
    getCountryAllTimeCases: async (country, status) => {
        return await fetchRequest(covidApiEndpoint.countryAllTimeCases(country, status));
    },
    getWorldDaysCases: async () => {
        return await fetchRequest(covidApiEndpoint.worldDaysCases())
    },
    getCountryDaysCases: async (country, status) => {
        return await fetchRequest(covidApiEndpoint.countryDaysCases(country, status))
    }
}

const covidApiEndpoint = {
    summary: () => {
        return getApiPath('summary');
    },
    worldAllTimeApiCases: () => {
        return getApiPath('world');
    },
    countryAllTimeCases: (country, status) => {
        let end_point = `dayone/country/${country}/status/${status}`;
        return getApiPath(end_point);
    },
    countryDaysCases: (country, status) => {
        let date = getDaysRange(30)

        let end_point = `country/${country}/status/${status}?from=${date.start_date}&to=${date.end_date}`

        return getApiPath(end_point)
    },
    worldDaysCases: () => {
        let date = getDaysRange(30)

        let end_point = `world?from=${date.start_date}&to=${date.end_date}`

        return getApiPath(end_point)
    }
}

getApiPath = (end_point) => {
    return COVID_API_BASE + end_point;
}

getDaysRange = (days) => {
    let d = new Date()

    let from_d = new Date(d.getTime() - (days * 24 * 60 * 60 * 1000))

    let to_date = `${d.getFullYear()}-${d.getMonth() + 1}-${d.getDate()}`

    let from_date = `${from_d.getFullYear()}-${from_d.getMonth() + 1}-${from_d.getDate()}`

    return {
        start_date: from_date,
        end_date: to_date
    }
}