(ns encode.core
  (:gen-class)
  (import [org.apache.commons.lang StringEscapeUtils])
  (require [seesaw.core :refer :all]
           [seesaw.chooser :refer (choose-file)]
           [clojure.java.io :refer :all]
           [clojure.string :refer (join)]
           (stemmers [core :refer (stems)]
                     [soundex]
                     [porter])))

(defn getHobbies [txt]
  (stems txt))

(defn encodePeoplePhotos []
    (let [photos (file-seq (file "./KingsGatePeoplePhotos"))
          out (file "residents.js")
          photostring (join ", " (map #(.getName %) photos))]
      (spit out (str "personPhotos = \"" photostring "\";\n") :append true)))

(defn encodeUnitPhotos []
  (let [units (file-seq (file "./KingsGateUnitPhotos"))
        out (file "residents.js")
        unitstring (join ", " (map #(.getName %) units))]
    (spit out (str "unitPhotos = \"" unitstring "\";\n") :append true)))

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
                           (do (spit out (str "jsObj = \"" (StringEscapeUtils/escapeJavaScript in) "\";\n"))
                               (encodePeoplePhotos)
                               (encodeUnitPhotos)
                               (System/exit 0))
                               )))))


(defn -main []
  (encodeframe))
