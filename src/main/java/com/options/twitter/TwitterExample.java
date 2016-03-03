package com.options.twitter;

import twitter4j.*;
import twitter4j.auth.AccessToken;
import twitter4j.conf.Configuration;
import twitter4j.conf.ConfigurationBuilder;

import java.io.IOException;
import java.net.URL;
import java.util.Arrays;

public class TwitterExample {
	public static void main(String[] args) {
		/*Twitter tweet = new TwitterFactory().getInstance();
		tweet.setOAuthConsumer("Eh6ORw6xv2AySZYPop5XrAfIo", "Hje97iYupevBa2yK0MnlXMeu834aO8fdGUV1RKZM1XLKhWcjD7");
		tweet.setOAuthAccessToken(new AccessToken("4843101499-cH4kiHHIZtIG0BKqtUk6bXb3thE0m1WoHx0cH0b",
				"9KPfR1K530DPvKsp46PPp7kGPsCCSUnFqrQQq1Hw0Fb8X"));*/
		
		
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

		try {
			ResponseList<Status> a = twitter.getUserTimeline(new Paging(1, 15));
			for (Status b : a) {
				System.out.println(b.getText());
			}
		} catch (Exception e) {

		}
	}

}
