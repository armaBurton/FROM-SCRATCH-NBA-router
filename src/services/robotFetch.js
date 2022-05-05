export default async function robotFetch(url){
  try {
    const robots = await fetch(url)

    const robotsJson = await robots.json();


    return robotsJson;
  } catch (error) {
    console.error(error);
  }
}