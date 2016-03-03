package com.options.action;

import java.io.BufferedReader;
import java.io.BufferedWriter;
import java.io.FileReader;
import java.io.FileWriter;
import java.io.InputStreamReader;
import java.net.URL;
import java.text.SimpleDateFormat;
import java.util.Calendar;
import java.util.Date;

import org.json.simple.JSONArray;
import org.json.simple.JSONObject;
import org.json.simple.parser.JSONParser;

import com.options.model.MessageStore;
import com.options.model.StrikeBean;
import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import com.opensymphony.xwork2.ActionSupport;

public class OptionsStrikeAction extends ActionSupport {
 
    private static final long serialVersionUID = 1L;
 
    private StrikeBean strikeBean;
    private String selectedDate;
    private String selectedTicker;
    private String strikeList;
    
    
     
    public String getStrikeList() {
		return strikeList;
	}

	public void setStrikeList(String strikeList) {
		this.strikeList = strikeList;
	}

	public String getSelectedDate() {
		return selectedDate;
	}

	public void setSelectedDate(String selectedDate) {
		this.selectedDate = selectedDate;
	}
	
	

	public String getSelectedTicker() {
		return selectedTicker;
	}

	public void setSelectedTicker(String selectedTicker) {
		this.selectedTicker = selectedTicker;
	}

	public String execute() throws Exception {
         
    	/*JSONArray strikeArray=new JSONArray();
    	JSONObject jobj=new JSONObject();
    	jobj.put("name", "ashok");
    	jobj.put("phone", "6504388421");
    	strikeArray.add(jobj);*/
    	//read expirations
    	String month=selectedDate;
		String ticker=selectedTicker;
		readStrikes(month,ticker);
		JSONParser jsonParser = new JSONParser();
		JSONArray jsonarray = new JSONArray();

		try {
			JSONObject jsonObject = (JSONObject) jsonParser.parse(new FileReader("strikes.txt"));

			JSONArray puts = (JSONArray) jsonObject.get("puts");
                for (Object o : puts) {
				JSONObject jsonobject = (JSONObject) o;
				String strike = (String) jsonobject.get("strike");
				jsonarray.add(strike);
			}
			System.out.println(jsonarray);
			
			Gson gson = new GsonBuilder().create();
			strikeList = gson.toJson(jsonarray);
	    	System.out.println("strikeList************"+strikeList);
			
			
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
    	
    	strikeBean = new StrikeBean(jsonarray) ;
        return SUCCESS;
    }
 
    public StrikeBean getStrikeBean() {
        return strikeBean;
    }
 
    public void StrikeBean(StrikeBean strikeBean) {
        this.strikeBean = strikeBean;
    }
    public static void readStrikes(String month,String ticker) throws Exception {
    	 
    	SimpleDateFormat formatter = new SimpleDateFormat("dd MMM yy");
    	Date date = formatter.parse(month);
		System.out.println(date);
		System.out.println(formatter.format(date));
		Calendar calendar = Calendar.getInstance();
        calendar.setTime(date);
        int expd=calendar.get(Calendar.DAY_OF_MONTH);
        int expy=calendar.get(Calendar.YEAR);
        int expm=calendar.get(Calendar.MONTH)+1;
        System.out.println(calendar.get(Calendar.YEAR)); 
        System.out.println(calendar.get(Calendar.MONTH)+1); 
        System.out.println(calendar.get(Calendar.DAY_OF_MONTH));
    	  //File f=new File("options.txt");
    	 //System.out.println(" can read==" +f.canRead());
    	 //BufferedReader br = new BufferedReader(new FileReader("options.txt"));
    	 String surl="http://www.google.com/finance/option_chain?q="+ticker+"+&expd="+expd+"&expm="+expm+"&expy="+expy+"&output=json";
    	 System.out.println("Strikes URL ==>"+surl);
    	 URL strikesurl = new URL(surl);
    	 //URL yahoo = new URL("http://www.google.com/finance/option_chain?q=AAPL&output=json");
    	 BufferedReader br = new BufferedReader(new InputStreamReader(strikesurl.openStream()));
    	 
    	 FileWriter fw=new FileWriter("strikes.txt");
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
