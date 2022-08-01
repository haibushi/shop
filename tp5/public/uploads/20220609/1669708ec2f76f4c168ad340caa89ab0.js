// const url = `https://bitbucket.org/!api/internal/repositories/miktechnology/arr-web/changesets?fields=%2B%2A.participants.approved%2C-%2A.participants.%2A&page=1&pagelen=100&truncate_to=256`;


async function getBibucketCommitData(fields,values,repository = "arr-web", length = 1000, pageSize = 100) {
	//const fields = ['Workstream','Owner','Scrum Master','Ticket ID','Repo','Commit ID','Change Scope','QA','Ticket Status','Stg Test Result','APS/TST/UAT Test Result','Comment','Deployment Status']
    const num = Math.ceil(length/pageSize);
    const promiseAll = [];
    let result = [];
    const url = `https://bitbucket.org/!api/internal/repositories/miktechnology/${repository}/changesets?fields=%2B%2A.participants.approved%2C-%2A.participants.%2A&truncate_to=256&pagelen=${pageSize}`;
    for (let i = 0; i < num; i++) {
        const _url = url + "&page="+(i+1);
        promiseAll.push(fetch(_url))
    }
    console.time("time1")
    const data = await Promise.all(promiseAll);
	
	
    console.timeEnd("time1");
    for (const item of data) {
        if (item.status === 200) {
            const json = await item.json();
            result = result.concat(json.values);
        }
    }
    let exportData = [];
    const getValByField = (data, fields) => {
        return fields.reduce((prev, current) => {
            return (prev && prev[current]) ? prev[current] : null;
        }, data);
    }
    //result.forEach(item => {
    values.forEach(item => {
        let str = '';
        fields.forEach(field => {
            const _field = field.split(".");
            //let val = getValByField(item, _field);
			let val = item[field];
            //val = val.replaceAll("\n", "\t");
            //val = field === 'date' ? new Date(val).toLocaleString() : val;
            str += `${val}\t,`
        });
        exportData.push(str);
    });


    exportData.unshift(fields.join(","));
    const exportStr = exportData.join("\n");

    // const uri =  "data:text/cvs;charset=utf-8,\ufeff" + encodeURIComponent(exportStr); 
    const blob = new Blob(["\uFEFF" + exportStr], { type: 'text/csv;charset=utf-8;' });

    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = `${repository}_commit_${Date.now()}.csv`;
    link.click();
}


