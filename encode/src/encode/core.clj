(ns encode.core
  (import [org.apache.commons.lang StringEscapeUtils])
  (require [seesaw.core :refer :all]))

(defn create-frame []
  (native!)
  (let [f (frame :title "Convert database" :on-close :exit)
        lbl (label "Database file")
        chfile (button :text "Browse")
        txt (text :columns 30)
        pan (flow-panel :items [lbl txt chfile])]
    (config! f :content pan)
    (-> f pack! show!)))

(defn -main []
  (create-frame)
  (println (StringEscapeUtils/escapeJavaScript "\"hello, world\"")))
