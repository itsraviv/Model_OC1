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

public class OptionsAskBidPriceAction extends ActionSupport {
 
    private static final long serialVersionUID = 1L;
 
    private StrikeBean strikeBean;
    
    private String selectedStrike;
    private String selectedDate;
    private String selectedTicker;
    private String callPutSelected;
    private String askBid;
    
    
     
    public String getAskBid() {
		return askBid;
	}

	public void setAskBid(String askBid) {
		this.askBid = askBid;
	}

	public String getSelectedStrike() {
		return selectedStrike;
	}

	public void setSelectedStrike(String selectedStrike) {
		this.selectedStrike = selectedStrike;
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

	

	public String getCallPutSelected() {
		return callPutSelected;
	}

	public void setCallPutSelected(String callPutSelected) {
		this.callPutSelected = callPutSelected;
	}

	public String execute() throws Exception {
         
    	//Strike should be passed from struts 
    	String strike=selectedStrike;
    	//month should be passed from struts
    	String month=selectedDate;
    	//ticker should be passed from struts
		String ticker=selectedTicker;
		//option type should be passed from struts
    	String optionType=callPutSelected;
		readStrikes(month,ticker);
		JSONParser jsonParser = new JSONParser();
		JSONArray putArray = new JSONArray();
		JSONArray callArray = new JSONArray();


		try {
			JSONObject jsonObject = (JSONObject) jsonParser.parse(new FileReader("askbid.txt"));
			JSONArray puts = (JSONArray) jsonObject.get("puts");
			JSONArray calls = (JSONArray) jsonObject.get("calls");
			JSONObject jsonObj = new JSONObject();
			if (optionType.equals("0")) {
				for (Object o : puts) {
					JSONObject jsonobject1 = (JSONObject) o;
					String strike1 = (String) jsonobject1.get("strike");
					if (strike1.equals(strike)) {

						JSONObject jsonobject = (JSONObject) o;
						String ask = (String) jsonobject.get("a");
						putArray.add(ask);
						String bid = (String) jsonobject.get("b");
						putArray.add(bid);
						String price = (String) jsonobject.get("p");
						putArray.add(price);
						System.out.println(putArray);
						
						jsonObj.put("Ask", ask);
						jsonObj.put("Bid", bid);
						jsonObj.put("Last", price);
						
						strikeBean = new StrikeBean(putArray);
						
						Gson gson = new GsonBuilder().create();
						askBid = gson.toJson(jsonObj);
				    	System.out.println("askBid jsonObj************"+jsonObj);
						
					}
				}
			} else if (optionType.equals("1")) {
				for (Object o : calls) {
					JSONObject jsonobject1 = (JSONObject) o;
					String strike1 = (String) jsonobject1.get("strike");
					if (strike1.equals(strike)) {

						JSONObject jsonobject = (JSONObject) o;
						String ask = (String) jsonobject.get("a");
						callArray.add(ask);
						String bid = (String) jsonobject.get("b");
						callArray.add(bid);
						String price = (String) jsonobject.get("p");
						callArray.add(price);
						System.out.println(callArray);
						// return callArray;
						strikeBean = new StrikeBean(callArray);
						
						jsonObj.put("Ask", ask);
						jsonObj.put("Bid", bid);
						jsonObj.put("Last", price);
						
						Gson gson = new GsonBuilder().create();
						askBid = gson.toJson(jsonObj);
				    	System.out.println("askBid jsonObj************"+jsonObj);
					}
				}
			}

			// System.out.println(callArray);
			// System.out.println(putArray);
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
    	
    	
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
    	 BufferedReader br = new BufferedReader(new InputStreamReader(strikesurl.openStream()));
    	 
    	 FileWriter fw=new FileWriter("askbid.txt");
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
