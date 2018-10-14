/* 
	* @author{Slimane AKALIA} slimaneakalia@gmail.com, Linkedin.com/in/slimaneakalia
*/
export default function checkDescription(text) {
  return new Promise((resolve, reject) => {
    console.log(`${text} is verified`);
    resolve();
    // reject("Description error : Minoucha");
  });
}
