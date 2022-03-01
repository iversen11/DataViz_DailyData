
library(tidyverse)
file <- '/Users/larkiniversen/Desktop/DataViz/Project1/Project1_Data_filled.csv'
data <- read.csv(file)

#trim to available data
data <- data[1:33,]

#Drop irrelevant columns, TODO some routines potentially being dropped for low data quality to trim to better fit visual constraints
trimmedData <- data %>% select(-c('X','Date', 'Day'))

#trim ivs and dvs for looping
ivs <- trimmedData %>% select(-c("De.Stress","Sleep","Focus"))
dvs <- trimmedData %>% select(c("De.Stress","Sleep","Focus"))

#take names of ivs and dvs for looping
ivNames <- colnames(ivs)
trimmedData[ivNames] <- lapply(trimmedData[ivNames], factor)
dvNames <- colnames(dvs)

models<- c()
ivFormula <- paste(ivNames, collapse = "+")

#loop DVs, and for each fit a model with all independent variables 
for(i in 1:length(dvNames)){
  
  #create formula and fit model
  loopFormula<- paste(dvNames[i], "~", ivFormula, sep = "")
  models[[i]] <- anova(lm(as.formula(loopFormula), data = trimmedData))
  
}

#create data frame for storing correlation values
corrFrame <- data.frame(matrix(ncol = length(dvNames), nrow = length(ivNames)))
colnames(corrFrame) <- dvNames
rownames(corrFrame) <- ivNames

#list correlations into data frame 
for(d in dvNames){
  for(i in ivNames){
    buff <- cor.test(eval(parse(text = sprintf("data$%s", d))), eval(parse(text = sprintf("data$%s", i))))
    corrFrame[i,d] <- buff$estimate
  }
}

write.csv(corrFrame, file = "/Users/larkiniversen/Desktop/DataViz/Project1/correlations.csv")
