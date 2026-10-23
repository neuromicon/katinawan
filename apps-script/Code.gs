function doGet() {
  var response;

  try {
    var spreadsheet = SpreadsheetApp.openById('1GJDa8kA5_JeCUkV9Dq9V1dcmqtR67lHgUAEWxgtZD7A');
    var sheet = spreadsheet.getSheetByName('Events');
    if (!sheet) throw new Error('Events sheet not found');
    var values = sheet.getDataRange().getValues();
    if (values.length === 0) {
      response = { status: 'success', data: [] };
    } else {
      var normalize = function (value) {
        return String(value).trim().toLowerCase().replace(/[^a-z0-9]/g, '');
      };
      var headers = values[0].map(normalize);
      var publishedColumn = headers.indexOf('published');
      if (publishedColumn < 0) throw new Error('Published column not found');

      var column = function (names) {
        for (var i = 0; i < names.length; i += 1) {
          var index = headers.indexOf(normalize(names[i]));
          if (index >= 0) return index;
        }
        return -1;
      };
      var eventIdColumn = column(['event_id', 'event id', 'id', 'slug']);
      var titleColumn = column(['title', 'event_title', 'event name', 'name']);
      var startColumn = column(['starts_at', 'start date', 'starts at', 'date']);
      var endColumn = column(['ends_at', 'end date', 'ends at']);
      var descriptionColumn = column(['description', 'details']);
      var timezoneColumn = column(['timezone', 'time zone']);
      var capacityColumn = column(['capacity', 'max attendees', 'max participants']);
      var locationColumn = column(['location_label', 'location', 'venue']);
      var locationVisibilityColumn = column(['location_visibility', 'location visibility']);

      var publicValue = function (row, index) {
        if (index < 0 || row[index] === '' || row[index] === null || row[index] === undefined) return '';
        var value = row[index];
        return value instanceof Date ? value.toISOString() : String(value).trim();
      };

      var events = values.slice(1)
        .filter(function (row) {
          return String(row[publishedColumn]).trim().toUpperCase() === 'TRUE';
        })
        .map(function (row) {
          var eventId = publicValue(row, eventIdColumn);
          var startDate = publicValue(row, startColumn);
          var locationVisibility = publicValue(row, locationVisibilityColumn).toUpperCase();
          return {
            event_id: eventId,
            title: publicValue(row, titleColumn),
            slug: publicValue(row, column(['slug'])) || eventId,
            description: publicValue(row, descriptionColumn),
            starts_at: startDate,
            ends_at: publicValue(row, endColumn),
            timezone: publicValue(row, timezoneColumn) || 'Asia/Manila',
            capacity: Number(publicValue(row, capacityColumn)) || 0,
            location_label: publicValue(row, locationColumn),
            location_visibility: locationVisibility === 'PUBLIC' ? 'PUBLIC' : 'PRIVATE',
            status: 'PUBLISHED'
          };
        })
        .filter(function (event) {
          return event.event_id && event.title && event.starts_at;
        });

      response = { status: 'success', data: events };
    }
  } catch (error) {
    response = { status: 'error', message: 'Published events are unavailable.' };
  }

  return ContentService
    .createTextOutput(JSON.stringify(response))
    .setMimeType(ContentService.MimeType.JSON);
}
