package com.options.model;

import org.json.simple.JSONArray;

public class StrikeBean {
    
    private JSONArray strikes;
     
    public StrikeBean(JSONArray strikes) {
         
        setStrikes(strikes);
    }
 
    public JSONArray getStrikes() {
 
        return strikes;
    }
 
    public void setStrikes(JSONArray strikes) {
 
        this.strikes = strikes;
    }
 
}