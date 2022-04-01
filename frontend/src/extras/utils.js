import moment from 'moment'


export const u_invalid_tokens = (string) => {
    const invalid_tokens = [";", "<", ">"]
    for (let i in string.length) {
        for (let j in invalid_tokens) {
            if (string[i] == invalid_tokens[j]) {
                return true;
            }
        }
    }
    return false;
}
export const u_significant_figures = (string) => {
    let intString = parseInt(string)
    return intString
}

export const u_format_name = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

export const u_format_array = (arr) => {
    let x = ""
    for (let i in arr) {
        x += arr[i]
        if(i == arr.length - 1){
            // STUB
        }
        else if (i > 0) {
            x+= ", "
        }
    }
    return x
}

export const u_format_date = (date) => {
    let d = new Date(new Date(date).toDateString())
    return d.getDate() + "/" + (d.getMonth() + 1) + "/" + d.getFullYear()
}
export const u_format_price = (data) => {
    return data/100
}

export const u_format_server_text = (text) => {
    text.replace("\n", "<br />")
}
export const titles = ['Mrs', 'Miss', 'Ms', 'Mr', 'Sir', 'Dr', 'Mr', 'Mx', 'Lady', 'Lord']
export const genders = ['M', 'F']
export const steps = [{ title: "Personal Information", icon: 1 }, { title: "Pictures", icon: 2 }, { title: "Stuff about you!", icon: 3 }]
