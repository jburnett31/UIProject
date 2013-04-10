(ns encode.core
  (import [org.apache.commons.lang StringEscapeUtils])
  (require [seesaw.core :refer :all]
           [seesaw.chooser :refer (choose-file)]
           [clojure.java.io :refer :all]))

(defn encodeframe []
  (native!)
  (let [f (frame :title "Convert database" :on-close :exit)
        lbl (label "Database file")
        chfile (button :text "Browse")
        txt (text :columns 30)
        go (button :text "Convert")
        pan (flow-panel :items [lbl txt chfile go])]
    (config! f :content pan)
    (-> f pack! show!)
    (listen chfile :action (fn [e]
                             (if-let [f (choose-file)]
                               (text! txt (.getAbsolutePath f)))))
    (listen go :action (fn [e]
                         (let [in (slurp (file (text txt)))
                               out (file "residents.js")]
                           (spit out (str "jsObj = \"" (StringEscapeUtils/escapeJavaScript in) "\"")))))))

(defn -main []
  (encodeframe)
  (println (StringEscapeUtils/escapeJavaScript "\"hello, world\"")))
