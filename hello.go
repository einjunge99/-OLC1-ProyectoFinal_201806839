package main

import (
		"net/http"
		"html/template"
		)


func index_handler(w http.ResponseWriter,r *http.Request) {
	t, _ :=	template.ParseFiles("basictemplating.html")
	t.Execute(w, nil)
}

func main() {

	http.HandleFunc("/",index_handler)
	http.Handle("/js/", http.StripPrefix("/js/", http.FileServer(http.Dir("./js"))))
	http.Handle("/css/", http.StripPrefix("/css/", http.FileServer(http.Dir("./css"))))
	http.ListenAndServe(":8000",nil)

}

