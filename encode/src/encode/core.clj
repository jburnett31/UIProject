(ns encode.core
  (import [org.apache.commons.lang StringEscapeUtils])
  (require [seesaw.core :refer :all]
           [seesaw.chooser :refer (choose-file)]
           [clojure.java.io :refer :all]
           (stemmers [core :refer (stems)]
                     [soundex]
                     [porter])))

(defn getHobbies [txt]
  (stems txt))

(defn encodeframe []
  (native!)
  (let [f (frame :title "Convert database" :on-close :exit)
        inst (label " This program will convert the txt file into a database usable by the browser")
        lbl (label "Database file")
        chfile (button :text "Browse")
        txt (text :columns 30)
        go (button :text "Convert")
        pan (flow-panel :items [lbl txt chfile go])
        grid (grid-panel :rows 2 :items [inst pan])]
    (config! f :content grid)
    (-> f pack! show!)
    (listen chfile :action (fn [e]
                             (if-let [f (choose-file :dir
                                                     (System/getProperty "user.dir"))]
                               (text! txt (.getAbsolutePath f)))))
    (listen go :action (fn [e]
                         (let [in (slurp (file (text txt)))
                               out (file "residents.js")]
                           (spit out (str "jsObj = \"" (StringEscapeUtils/escapeJavaScript in) "\"")))))))

(defn -main []
  (encodeframe))
