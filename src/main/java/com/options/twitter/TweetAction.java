 package com.options.twitter;

import org.json.simple.JSONArray;
import org.json.simple.JSONObject;

import java.io.BufferedReader;
import java.io.BufferedWriter;
import java.io.FileReader;
import java.io.FileWriter;
import java.io.InputStreamReader;
import java.net.URL;
import java.util.Arrays;
import java.util.Iterator;

import org.json.simple.JSONArray;
import org.json.simple.JSONObject;
import org.json.simple.parser.JSONParser;
import org.json.simple.parser.ParseException;

import com.options.model.MessageStore;
import com.options.model.StrikeBean;

import twitter4j.Status;
import twitter4j.StatusUpdate;
import twitter4j.Twitter;
import twitter4j.TwitterFactory;
import twitter4j.auth.AccessToken;
import twitter4j.conf.Configuration;
import twitter4j.conf.ConfigurationBuilder;

import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import com.opensymphony.xwork2.ActionSupport;
 
public class TweetAction extends ActionSupport {
 
    private static final long serialVersionUID = 1L;
 
    private StrikeBean strikeBean;
    private String expirations;
    private String graph;
    
    public String getGraph() {
        return graph;
    }
 
    public void setGraph(String graph) {
        this.graph = graph;
    }
    
    public String getExpirations() {
		return expirations;
	}

	public void setExpirations(String expirations) {
		this.expirations = expirations;
	}
     
    public String execute() throws Exception {
    	
    	String postmsg = "New Options";
    	
    	String consumerKey = "Eh6ORw6xv2AySZYPop5XrAfIo";
		String consumerSecret = "Hje97iYupevBa2yK0MnlXMeu834aO8fdGUV1RKZM1XLKhWcjD7";
		String accessToken = "4843101499-cH4kiHHIZtIG0BKqtUk6bXb3thE0m1WoHx0cH0b";
		String accessTokenSecret = "9KPfR1K530DPvKsp46PPp7kGPsCCSUnFqrQQq1Hw0Fb8X";
		ConfigurationBuilder builder = new ConfigurationBuilder();
		builder.setOAuthConsumerKey(consumerKey);
		builder.setOAuthConsumerSecret(consumerSecret);
		Configuration configuration = builder.build();
		TwitterFactory factory = new TwitterFactory(configuration);
		Twitter twitter = factory.getInstance();

		// Instantiate a new Twitter instance

		// setup OAuth Consumer Credentials
		//twitter.setOAuthConsumer(consumerKey, consumerSecret);

		// setup OAuth Access Token
		twitter.setOAuthAccessToken(new AccessToken(accessToken, accessTokenSecret));

		// Instantiate and initialize a new twitter status update
		StatusUpdate statusUpdate = new StatusUpdate(
				// your tweet or status message
				postmsg);
				// attach any media, if you want to
				
				  statusUpdate.setMedia(
				  "http://finance.yahoo.com" , new
				  //URL("http://cbsnews1.cbsistatic.com/hub/i/2015/12/22/46c513ee-e35d-48a2-a6d6-42b4f0ac918f/4e19e107831ceaef0af998a040dd6662/tumblrinlinenyag8st3dd1spdppr500.jpg").openStream());
				  URL("http://54.153.59.244/:8080/optionscircle/images/chart_shot.png").openStream());
				 

		// tweet or update status
		Status status = twitter.updateStatus(statusUpdate);

		// response from twitter server
		System.out.println("status.toString() = " + status.toString());
		System.out.println("status.getInReplyToScreenName() = " + status.getInReplyToScreenName());
		System.out.println("status.getSource() = " + status.getSource());
		System.out.println("status.getText() = " + status.getText());
		System.out.println("status.getContributors() = " + Arrays.toString(status.getContributors()));
		System.out.println("status.getCreatedAt() = " + status.getCreatedAt());
		System.out.println("status.getCurrentUserRetweetId() = " + status.getCurrentUserRetweetId());
		System.out.println("status.getGeoLocation() = " + status.getGeoLocation());
		System.out.println("status.getId() = " + status.getId());
		System.out.println("status.getInReplyToStatusId() = " + status.getInReplyToStatusId());
		System.out.println("status.getInReplyToUserId() = " + status.getInReplyToUserId());
		System.out.println("status.getPlace() = " + status.getPlace());
		System.out.println("status.getRetweetCount() = " + status.getRetweetCount());
		System.out.println("status.getRetweetedStatus() = " + status.getRetweetedStatus());
		System.out.println("status.getUser() = " + status.getUser());
		System.out.println("status.getAccessLevel() = " + status.getAccessLevel());
		System.out.println("status.getHashtagEntities() = " + Arrays.toString(status.getHashtagEntities()));
		System.out.println("status.getMediaEntities() = " + Arrays.toString(status.getMediaEntities()));
		if (status.getRateLimitStatus() != null) {
			System.out.println("status.getRateLimitStatus().getLimit() = " + status.getRateLimitStatus().getLimit());
			System.out.println(
					"status.getRateLimitStatus().getRemaining() = " + status.getRateLimitStatus().getRemaining());
			System.out.println("status.getRateLimitStatus().getResetTimeInSeconds() = "
					+ status.getRateLimitStatus().getResetTimeInSeconds());
			System.out.println("status.getRateLimitStatus().getSecondsUntilReset() = "
					+ status.getRateLimitStatus().getSecondsUntilReset());
			// System.out.println("status.getRateLimitStatus().getRemainingHits()
			// = " + status.getRateLimitStatus().getRemainingHits());
		}
		System.out.println("status.getURLEntities() = " + Arrays.toString(status.getURLEntities()));
		System.out.println("status.getUserMentionEntities() = " + Arrays.toString(status.getUserMentionEntities()));
         
    	
    	
        return SUCCESS;
    }
 
    
}
