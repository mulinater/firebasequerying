

document.querySelector("#submit").addEventListener('click', () => {

    let name = document.querySelector("#name").value;
    let age = document.querySelector("#age").value;
    let color = document.querySelector("#favcolor").value;

    let user = {
        name: name,
        age: parseInt(age),
        color: color,
    };
    
    // console.log(user);

    // save user into the DB
    db.collection('mypeople')
        .add(user)
        .then(() => {
            alert("new user added!");
        });

}); 

// save doc
function save_doc(ele, id){
    let inputs = ele.parentNode.querySelectorAll("input");
    // console.log(inputs[0].value);
    // console.log(inputs[1].value);

    // call the update function on the database

    db.collection("mypeople").doc(id).update({
        name: inputs[0].value,
        age: inputs[1].value,
    }).then(() => {
        alert("data updated");
        show_people();
    })

};


//update a document


function update_doc(ele, id){
    ele.parentNode.querySelectorAll("input").forEach(e => {
        e.type = "text"
    });

    ele.parentNode.querySelector("button").hidden = "";
}

function show_people() {
    // data retrieval
    db.collection("mypeople")
        .get()
        .then((mydata) => {
            let docs = mydata.docs;

            let html = ``; 
            // loop through docs array
            docs.forEach((d) => {
                // console.log(d.data().name);
                html += `<p>Name: ${d.data().name} <input type="hidden" value="${d.data().name}">
                </input> Age: ${d.data().age} <input type="hidden" value="${d.data().age}"> 
                
                
                
                <button hidden="hidden" onclick="save_doc(this, '${d.id}')">Save</button></input>years old. <span class="subtitle m-4">${d.id}</span>
        

                <button class="is-pulled-right" onclick="del_doc('${d.id}')">Delete</button>
                

                <button class="is-pulled-right" onclick="update_doc(this, '${d.id}')">Update</button>

                </p>`
                
            });
            // console.log(html)

            document.querySelector("#all_people").innerHTML = html;
    })
}

// cALL THE functions
// show_people();

// delete the user test
//delete()

// db.collection("mypeople").doc('id').delete().then(() => {
//     alert("user deleted");
// })

function del_doc(docid){
    db.collection("mypeople").doc(docid).delete().then(() => {
    alert("user deleted");
    show_people();
})


}
// jackie changed to jackie D
// update the age of jackie to 50 from 49
// update () .. need to provideFB with the doc ID and the field value

// db.collection("mypeople").doc("U0cL9gxq3YUYso4c6Skr").update({
//     age: 69,
//     name: 'Jackie D',
//     color: 'gray',
//     city: "madison",
//     friends: ["none", "mikey williams", "jnr"],
//     favourites: {
//         sports: "soccer",
//         siblings: "sarah",
//         food: "pizza",
//         color: 'gray',

//     }
// })


// jackie has white as her favourte color

db.collection("mypeople").doc("U0cL9gxq3YUYso4c6Skr").update({
    color: "aqua",
    "favourites.color": "white"
})

//remove om from sally's friends
// add joe as a new friend for sally
// friends are stored in an array on FB

db.collection("mypeople").doc('U0cL9gxq3YUYso4c6Skr').update({
    friends: firebase.firestore.FieldValue.arrayUnion("joe"),
});


db.collection("mypeople").doc('U0cL9gxq3YUYso4c6Skr').update({
    friends: firebase.firestore.FieldValue.arrayRemove("joe"),
});

db.collection("mypeople").get()

// Function to count items
function countItemsRealtimeDB() {
    const itemsRef = database.ref('mypeople');
    
    itemsRef.once('value', (snapshot) => {
        const itemCount = snapshot.numChildren(); // Count the number of child nodes
        console.log(`Total items in database: ${itemCount}`);
    });
}

// show people whose name is john

// db.collection("mypeople").where("name", "==", "john f").get().then((data) => {
//     let mydocs = data.docs;

//     if (mydocs.length = 0) {
//         console.log("no user found")
//         return
//     }
//     console.log(`${mydocs.length} users found`)
//     mydocs.forEach((d) => {
//         console.log(d.data())
//     });  

// })

//show all users who name is john and are 21 years old
// db.collection("mypeople")
//     .where("name", "==", "john f")
//     .where("age", "<", 21)
//     .get().then((data) => {
//     let mydocs = data.docs;

//     if (mydocs.length = 0) {
//         console.log("no user found")
//         return
//     }
//     console.log(`${mydocs.length} users found`)
//     mydocs.forEach((d) => {
//         console.log(d.data())
//     });  

// })

//show all people not jackie
// db.collection("mypeople")
//     .where("name", "!=", "jackie")
//     .where("age", "<", 21)
//     .get().then((data) => {
//     let mydocs = data.docs;

//     if (mydocs.length = 0) {
//         console.log("no user found")
//         return
//     }
//     console.log(`${mydocs.length} users found`)
//     mydocs.forEach((d) => {
//         console.log(d.data())
//     });  

// })


// db.collection("mypeople")
//     .where("name", "not-in, "["John", "kelly"])
//     .where("age", "<", 21)
//     .get().then((data) => {
//     let mydocs = data.docs;

//     if (mydocs.length = 0) {
//         console.log("no user found")
//         return
//     }
//     console.log(`${mydocs.length} users found`)
//     mydocs.forEach((d) => {
//         console.log(d.data())
//     });  

// })

// db.collection("mypeople")
//     .where("friends", "array-contains", "john")
//     .get().then((data) => {
//     let mydocs = data.docs;

//     if (mydocs.length = 0) {
//         console.log("no user found")
//         return
//     }
//     console.log(`${mydocs.length} users found`)
//     mydocs.forEach((d) => {
//         console.log(d.data())
//     });  

// })                                                                                                                                                   

team1 = {
    "team_name": "Real Madrid",
    "city": "Madrid",
    "country": "Spain",
    "top_scorers": ["Ronaldo", "Benzema", "Hazard"],
    "worldwide_fans_millions": 798
}

team2 = {
    "team_name": "Barcelona",
    "city": "Barcelona",
    "country": "Spain",
    "top_scorers": ["Messi", "Suarez", "Puyol"],
    "worldwide_fans_millions": 738
}

team3 = {
    "team_name": "Manchester United",
    "city": "Manchester",
    "country": "England",
    "top_scorers": ["Cantona", "Rooney", "Ronaldo"],
    "worldwide_fans_millions": 755
}

team4 = {
    "team_name": "Manchester City",
    "city": "Manchester",
    "country": "England",
    "top_scorers": ["Sterling", "Aguero", "Haaland"],
    "worldwide_fans_millions": 537
}

team5 = {
    "team_name": "Brazil National Team",
    "city": "Not applicable",
    "country": "Brazil",
    "top_scorers": ["Ronaldo", "Cafu", "Bebeto"],
    "worldwide_fans_millions": 950
}

team6 = {
    "team_name": "Argentina National Team",
    "city": "Not applicable",
    "country": "Argentina",
    "top_scorers": ["Messi", "Batistuta", "Maradona"],
    "worldwide_fans_millions": 888
}

team7 = {
    "team_name": "Atletico Madrid",
    "city": "Madrid",
    "country": "Spain",
    "top_scorers": ["Aragonés", "Griezmann", "Torez"],
    "worldwide_fans_millions": 400
}



function show_teams() {
    // data retrieval
    db.collection("myteams")
        .get()
        .then((mydata) => {
            let docs = mydata.docs;

            let html = ``; 
            // loop through docs array
            docs.forEach((d) => {
                // console.log(d.data().name);
                html += `<p>${d.data().team_name} <input type="hidden" value="${d.data().team_name}">
                </input>${d.data().country} <input type="hidden" value="${d.data().country}"> 
                
                
                
                <button hidden="hidden" onclick="save_doc(this, '${d.id}')">Save</button></input><span class="subtitle m-4">${d.id}</span>
        

                <button class="is-pulled-right" onclick="del_doc('${d.id}')">Delete</button>
                

                <button class="is-pulled-right" onclick="update_doc(this, '${d.id}')">Update</button>

                </p>`
                
            });
            // console.log(html)

            document.querySelector("#all_people").innerHTML = html;
    })
}


// show_teams()

// THURSDAY NOTES
//OPTION 1
// store all data within docs; use review id, rest id, and relevant fields (relation on rest id); simple and easy to filter and find
// review is basically an array; but not scaleable for over 20K records (firebasee cares of how many reads and writes)- fetches entire
// fetches entrire document data packet related ; performance issues- client side processing


// OPTION 2
// subcollection
    // documents size is smaller, but multiple documents with relationships
    // scaleability wise makes the most sense; seperatino between entities crreatsa logical schema
    // queries can be expensive (finding best sushi place)- complex queries (own composite indexes)
    // deleting could be problematic
   
//no solution that is easy to query and is still scaleable
// have to look at operation first


// OPTION 3
// several op level root level collections
// reveiws and rest collections seperated (include restid as well)
// logical schema-represent slogical design simple in nature
// scaleable as wel
// CONS - Complex like a join db.collection.get('restruataion') and then another query for db.collection(reviews)async
    // asynchronomous so could be slow data fetch because its easentialy linked two large collections
    // need composite indexes; (ordering by say published date you will have to require)
    // tradeoffs; changes based on overtime need to be considered; this design wins by far






// app -> request sent to resource ()
// rules for all collections
// 2 rules for specific collection
// read (get) and write (create update delete)






// Function to display data in the browser
function displayOutput(title, data) {
    const outputDiv = document.querySelector("#all_people");
    let html = `<h3><b>${title}</b></h3>`;
    data.forEach((d) => {
      html += `<p>${d.team_name} - ${d.city}, ${d.country} - Fans: ${d.worldwide_fans_millions}M</p>`;
    });
    outputDiv.innerHTML += html;
  }
  
  // Function to run queries and display results
  function runQueries() {
    
    // 1. Show all teams in Spain
    db.collection("myteams")
      .get()
      .then((mydata) => {
        let docs = mydata.docs;
        let filteredDocs = [];
        docs.forEach((doc) => {
          if (doc.data().country === "Spain") {
            filteredDocs.push(doc);
          }
        });
        displayOutput("All teams in Spain", filteredDocs.map((doc) => doc.data()));
      });
  
    // 2. Show all teams in Madrid, Spain
    db.collection("myteams")
      .get()
      .then((mydata) => {
        let docs = mydata.docs;
        let filteredDocs = [];
        docs.forEach((doc) => {
          if (doc.data().country === "Spain" && doc.data().city === "Madrid") {
            filteredDocs.push(doc);
          }
        });
        displayOutput("All teams in Madrid, Spain", filteredDocs.map((doc) => doc.data()));
      });
  
    // 3. Show all national teams
    db.collection("myteams")
      .get()
      .then((mydata) => {
        let docs = mydata.docs;
        let filteredDocs = [];
        docs.forEach((doc) => {
          if (doc.data().city === "Not applicable") {
            filteredDocs.push(doc);
          }
        });
        displayOutput("All national teams", filteredDocs.map((doc) => doc.data()));
      });
  
    // 4. Show all teams that are not in Spain
    db.collection("myteams")
      .get()
      .then((mydata) => {
        let docs = mydata.docs;
        let filteredDocs = [];
        docs.forEach((doc) => {
          if (doc.data().country !== "Spain") {
            filteredDocs.push(doc);
          }
        });
        displayOutput("All teams not in Spain", filteredDocs.map((doc) => doc.data()));
      });
  
    // 5. Show all teams that are not in Spain or England
    db.collection("myteams")
      .get()
      .then((mydata) => {
        let docs = mydata.docs;
        let filteredDocs = [];
        docs.forEach((doc) => {
          if (doc.data().country !== "Spain" && doc.data().country !== "England") {
            filteredDocs.push(doc);
          }
        });
        displayOutput("All teams not in Spain or England", filteredDocs.map((doc) => doc.data()));
      });
  
    // 6. Show all teams in Spain with more than 700M fans
    db.collection("myteams")
      .get()
      .then((mydata) => {
        let docs = mydata.docs;
        let filteredDocs = [];
        docs.forEach((doc) => {
          if (doc.data().country === "Spain" && doc.data().worldwide_fans_millions > 700) {
            filteredDocs.push(doc);
          }
        });
        displayOutput("All teams in Spain with more than 700M fans", filteredDocs.map((doc) => doc.data()));
      });
  
    // 7. Show all teams with a number of fans in the range of 500M and 600M
    db.collection("myteams")
      .get()
      .then((mydata) => {
        let docs = mydata.docs;
        let filteredDocs = [];
        docs.forEach((doc) => {
          if (doc.data().worldwide_fans_millions >= 500 && doc.data().worldwide_fans_millions <= 600) {
            filteredDocs.push(doc);
          }
        });
        displayOutput("All teams with fans in the range of 500M to 600M", filteredDocs.map((doc) => doc.data()));
      });
  
    // 8. Show all teams where Ronaldo is a top scorer
    db.collection("myteams")
      .get()
      .then((mydata) => {
        let docs = mydata.docs;
        let filteredDocs = [];
        docs.forEach((doc) => {
          if (doc.data().top_scorers.includes("Ronaldo")) {
            filteredDocs.push(doc);
          }
        });
        displayOutput("All teams where Ronaldo is a top scorer", filteredDocs.map((doc) => doc.data()));
      });
  
    // 9. Show all teams where Ronaldo, Maradona, or Messi is a top scorer
    db.collection("myteams")
      .get()
      .then((mydata) => {
        let docs = mydata.docs;
        let filteredDocs = [];
        docs.forEach((doc) => {
          if (["Ronaldo", "Maradona", "Messi"].some((scorer) => doc.data().top_scorers.includes(scorer))) {
            filteredDocs.push(doc);
          }
        });
        displayOutput("All teams where Ronaldo, Maradona, or Messi is a top scorer", filteredDocs.map((doc) => doc.data()));
      });
  
    // Task 3: Updating data
    // a. Updating existing data
    db.collection("myteams").doc("Fjn8urmfDAQ1IIzaY3Ic").get().then((doc) => {
      if (doc.exists) {
        db.collection("myteams").doc("Fjn8urmfDAQ1IIzaY3Ic").update({
          worldwide_fans_millions: 811,
          team_name: "Real Madrid FC",
          top_scorers: firebase.firestore.FieldValue.arrayRemove("Hazard")
        }).then(() => {
          db.collection("myteams").doc("Fjn8urmfDAQ1IIzaY3Ic").update({
            top_scorers: firebase.firestore.FieldValue.arrayUnion("Crispo")
          });
        });
  
        
      }
    });
  
    db.collection("myteams").doc("Vn0FNeEH38Q5PIp4yiw8").get().then((doc) => {
      if (doc.exists) {
        db.collection("myteams").doc("Vn0FNeEH38Q5PIp4yiw8").update({
          worldwide_fans_millions: 747,
          team_name: "FC Barcelona",
          top_scorers: firebase.firestore.FieldValue.arrayRemove("Puyol")
        }).then(() => {
          db.collection("myteams").doc("Vn0FNeEH38Q5PIp4yiw8").update({
            top_scorers: firebase.firestore.FieldValue.arrayUnion("Deco")
          });
        });
  
        
      }
    });
  
    // b. Adding new fields to existing documents
    db.collection("myteams").doc("Fjn8urmfDAQ1IIzaY3Ic").update({
      color: {
        home: "White",
        away: "Black"
      }
    });
  
    db.collection("myteams").doc("Vn0FNeEH38Q5PIp4yiw8").update({
      color: {
        home: "Red",
        away: "Gold"
      }
    });
  
    // c. Updating the jersey colors
    db.collection("myteams").doc("Fjn8urmfDAQ1IIzaY3Ic").update({
      "color.away": "Purple"
    });
  
    db.collection("myteams").doc("Vn0FNeEH38Q5PIp4yiw8").update({
      "color.away": "Pink"
    });
  }
  
  // Call the function to run all queries
  runQueries();
  
  

