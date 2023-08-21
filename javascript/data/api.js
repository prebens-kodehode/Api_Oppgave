/**
 * Returns data from given url
 * @param {String} url 
 * @returns 
 */
export async function getData(url) {
    const request = await fetch(url)
    const data = await request.json()
  
    return data
  }