const saveGuess = async (champ: string): Promise<void> => {
  await fetch("http://localhost:8080/guess/save", {
    method: "POST",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify({ champ }),
    credentials: "include",
  })
    .then((response) => console.log(response.text()))
    .then((data) => console.log(data))
    .catch((error) => console.log(error));
};

export default saveGuess;
