import csv

input_file = 'rsvp.csv'
output_file = 'rsvp_sorted.csv'

# Read the input CSV file into a list of lists
with open(input_file, 'r') as csvfile:
    csvreader = csv.reader(csvfile)
    data = [row for row in csvreader]

# Sort the data by the first column
data_sorted = sorted(data, key=lambda x: x[0])

# Remove rows with duplicate names in the first column
data_filtered = []
names = set()
for row in data_sorted:
    if row[0] not in names:
        data_filtered.append(row)
        names.add(row[0])

# Write the filtered and sorted data to a new CSV file
with open(output_file, 'w', newline='') as csvfile:
    csvwriter = csv.writer(csvfile)
    csvwriter.writerows(data_filtered)