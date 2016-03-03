package com.options.action;

import org.json.simple.JSONArray;
import org.json.simple.JSONObject;

import java.io.BufferedReader;
import java.io.BufferedWriter;
import java.io.FileReader;
import java.io.FileWriter;
import java.io.InputStreamReader;
import java.net.URL;
import java.util.Iterator;

import org.json.simple.JSONArray;
import org.json.simple.JSONObject;
import org.json.simple.parser.JSONParser;
import org.json.simple.parser.ParseException;

import com.options.model.MessageStore;
import com.options.model.StrikeBean;
import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import com.opensymphony.xwork2.ActionSupport;
 
public class OptionsExpirationsAction extends ActionSupport {
 
    private static final long serialVersionUID = 1L;
 
    private StrikeBean strikeBean;
    private String expirations;
    private String selectedTicker = null;
    
    
    
   

	public String getSelectedTicker() {
		return selectedTicker;
	}

	public void setSelectedTicker(String selectedTicker) {
		this.selectedTicker = selectedTicker;
	}

	public String getExpirations() {
		return expirations;
	}

	public void setExpirations(String expirations) {
		this.expirations = expirations;
	}
     
    public String execute() throws Exception {
    	
    	
         
    	JSONParser jsonParser = new JSONParser();
    	JSONArray jsonarray = new JSONArray();

    	try {
    		
    		System.out.println("Selected Ticker=="+selectedTicker);
    		//read expirations
    		readExpirations(selectedTicker);
    		JSONObject jsonObject = (JSONObject) jsonParser.parse(new FileReader("options1.txt"));
    		JSONArray expirations = (JSONArray) jsonObject.get("expirations");
    		 for (Object o : expirations) {
    				JSONObject jsonobject = (JSONObject) o;
    				long year = (Long) jsonobject.get("y");
    				long month = (Long) jsonobject.get("m");
    				Month months=new Month();
    			String mon=months.getMonthNumber(month);
    			long date = (Long) jsonobject.get("d");
    			 StringBuffer sb=new StringBuffer();
    			 sb.append(date +" ");
    			 sb.append(mon +" ");
    			 sb.append(year +"");
    			 //System.out.println(sb);
    			jsonarray.add(sb.toString());
    				
    			}
    		 System.out.println(jsonarray);
    	} catch (Exception e) {
    		// TODO Auto-generated catch block
    		e.printStackTrace();
    	}
    	/*JSONArray strikeArray=new JSONArray();
    	JSONObject jobj=new JSONObject();
    	jobj.put("name", "ashok");
    	jobj.put("phone", "6504388421");
    	strikeArray.add(jobj);
    	strikeBean = new StrikeBean(strikeArray) ;*/
    	strikeBean=new StrikeBean(jsonarray);
    	
    	Gson gson = new GsonBuilder().create();
    	expirations = gson.toJson(jsonarray);
    	System.out.println("Expirations************"+expirations);
    	
        return SUCCESS;
    }
 
    public StrikeBean getStrikeBean() {
        return strikeBean;
    }
 
    public void StrikeBean(StrikeBean strikeBean) {
        this.strikeBean = strikeBean;
    }
    
    public static void readExpirations(String tickerName) throws Exception {
   	 
  	  //File f=new File("options.txt");
  	 //System.out.println(" can read==" +f.canRead());
  	 //BufferedReader br = new BufferedReader(new FileReader("options.txt"));
  	 //http://www.google.com/finance/option_chain?q=AAPL&expd=4&expm=4&expy=2014&output=json
    	
    	
  	 //URL yahoo = new URL("http://www.google.com/finance/option_chain?q=AAPL&output=json");
    	String url = "http://www.google.com/finance/option_chain?q="+tickerName+"&output=json";
    	System.out.println("URL for Google finance---"+url.toString());
    	URL yahoo = new URL(url);
  	 BufferedReader br = new BufferedReader(new InputStreamReader(yahoo.openStream()));
  	 
  	 FileWriter fw=new FileWriter("options1.txt");
  	 BufferedWriter bw=new BufferedWriter(fw);
  	 try {
  		   StringBuilder sb = new StringBuilder();
  		    String line = br.readLine();

  		    while (line != null) {
  		        sb.append(line);
  		        //sb.append(System.lineSeparator());
  		        line = br.readLine();
  		    }
  		    String everything = sb.toString();
  		    //System.out.println(everything);
  		    //data = Regex.Replace(data, @"(\w+:)(\d+\.?\d*)", "$1\"$2\"");
  		    String str=everything.replaceAll("(\\w+)\\s*\\:","\"$1\" :");
  		    StringBuffer strb=new StringBuffer();
  		    strb.append(str);
  		    bw.write(strb.toString());
  		    //bw.flush();
  		    //Pattern patter= Pattern.compile("(\\w+)\\s*\\:");
  		    System.out.println(strb.toString());
  		    
  		    
  		} finally {
  		    br.close();
  		    bw.close();
  		}
  	 }
 
}
