import { Resend } from 'resend';
import fs from 'fs';
import csvParser from 'csv-parser';

const resend = new Resend('INSERT API KEY');

interface EventMapping {
  csvKey: string;
  label: string;
  attendedText: string;
  defaultText: string;
}

const events: EventMapping[] = [
  { 
    csvKey: 'Shitty First Drafts', 
    label: 'Shitty First Drafts', 
    attendedText: '✅ Completed',
    defaultText: '☑️ Yet to attend'
  },
  { 
    csvKey: 'Understanding Agency', 
    label: 'Understanding Agency', 
    attendedText: '✅ Attended',
    defaultText: '☑️ Yet to attend'
  },
  { 
    csvKey: 'Agency in Action', 
    label: 'Agency in Action', 
    attendedText: '✅ Attended',
    defaultText: '☑️ Yet to attend'
  },
  { 
    csvKey: 'Navigating Your Future', 
    label: 'Navigating Your Future', 
    attendedText: '✅ Attended',
    defaultText: '☑️ Yet to attend'
  },
  { 
    csvKey: 'Understanding System Design', 
    label: 'Understanding System Design', 
    attendedText: '✅ Attended',
    defaultText: '☑️ Yet to attend'
  },
];

function createProgressBar(attendedCount: number, totalEvents: number = 5): string {
  const percentage = Math.round((attendedCount / totalEvents) * 100);
  const filledBlocks = Math.round(percentage / 10);
  const emptyBlocks = 10 - filledBlocks;
  return '█'.repeat(filledBlocks) + '░'.repeat(emptyBlocks) + ` ${percentage}%`;
}

interface EventStatus {
  label: string;
  status: string;
}

function generateEmailHtml(recipientName: string, progressBar: string, eventStatuses: EventStatus[]): string {
  return `
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html dir="ltr" lang="en">
<head>
    <meta content="width=device-width" name="viewport" />
    <meta content="text/html; charset=UTF-8" http-equiv="Content-Type" />
    <meta name="x-apple-disable-message-reformatting" />
    <meta content="IE=edge" http-equiv="X-UA-Compatible" />
    <meta name="x-apple-disable-message-reformatting" />
    <meta content="telephone=no,address=no,email=no,date=no,url=no" name="format-detection" />
    <meta content="light" name="color-scheme" />
    <meta content="light dark" name="supported-color-schemes" />
</head>
<body style="font-family:-apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif;font-size:1.0769em;min-height:100%;line-height:155%">
    <table align="left" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="max-width:600px">
        <tbody>
            <tr>
                <td>
                    <p style="font-size:1em;padding:0.5em;text-align:left">
                        <span>${recipientName},</span>
                    </p>
                    <p style="font-size:1em;padding:0.5em;text-align:left">
                        <span>We're transforming The Second Design Workshops into a fun and flexible 5-lesson course -- </span><span><u>Beyond The Blueprint</u></span><span>.</span><br /><br />
                        <span>The journey of building and creating isn’t just about tools and techniques—it’s about how you think, decide, and adapt. Beyond the Blueprint is a course designed to help you break free from rigid structures and develop the mental models needed to navigate uncertainty, take ownership, and shape the future.</span>
                    </p>
                    <p style="font-size:1em;padding:0.5em;text-align:left">
                        <span>This five-lesson program will challenge how you approach problems, refine your ability to act with intention, and help you build the confidence to create—even when the path isn’t clear.</span><br /><br />
                        <span><strong>Why This Matters</strong></span>
                    </p>
                    <ul style="padding-left:1.1em;padding-bottom:1em">
                        <li style="margin:0 0 0.3em 1em;text-align:left">
                            <p style="margin:0;text-align:left"><span>You’ll learn </span><span><strong>how to think, not what to think</strong></span><span>.</span></p>
                        </li>
                        <li style="margin:0 0 0.3em 1em;text-align:left">
                            <p style="margin:0;text-align:left"><span>You’ll develop </span><span><strong>practical mental models for making better decisions</strong></span><span>.</span></p>
                        </li>
                        <li style="margin:0 0 0.3em 1em;text-align:left">
                            <p style="margin:0;text-align:left"><span>You’ll gain </span><span><strong>confidence in navigating ambiguity</strong></span><span> and complexity.</span></p>
                        </li>
                        <li style="margin:0 0 0.3em 1em;text-align:left">
                            <p style="margin:0;text-align:left"><span>You’ll become </span><span><strong>future-ready, proactive, and adaptable</strong></span><span>.</span></p>
                        </li>
                    </ul>
                    <hr style="width:100%;border:none;border-top:2px solid #eaeaea;padding-bottom:1em" />
                    <p style="font-size:1em;padding:0.5em;text-align:left"><span><strong>The Facilitators</strong></span></p>
                    <p style="font-size:1em;padding:0.5em;text-align:left">
                        <span><strong>Dr. Aruna</strong></span><span>, a </span><span><strong>former Harvard lecturer</strong></span><span> with extensive experience in STEM education, and </span><span><strong>Gautham</strong></span><span>, an </span><span><strong>education entrepreneur since 2013</strong></span><span> are committed to fostering innovative learning experiences.</span>
                    </p>
                    <hr style="width:100%;border:none;border-top:2px solid #eaeaea;padding-bottom:1em" />
                    <p style="font-size:1em;padding:0.5em;text-align:left"><span><strong>What's your progress</strong></span></p>
                    <p style="font-size:1em;padding:0.5em;text-align:left"><span style="color:rgb(0, 0, 0)">${progressBar}</span></p>
                    ${eventStatuses.map((event: EventStatus) => `
                    <p style="font-size:1em;padding:0.5em;text-align:left">
                        <span style="color:#9333EA"><strong>${event.label}</strong></span><span> · </span><span style="color:#9333EA">${event.status}</span>
                    </p>`).join('')}
                    <hr style="width:100%;border:none;border-top:2px solid #eaeaea;padding-bottom:1em" />
                    <p style="font-size:1em;padding:0.5em;text-align:left"><span><strong>Next steps</strong></span></p>
                    <p style="font-size:1em;padding:0.5em;text-align:left">
                        <span>In the app, you will be able to track the progress of the course. Please ensure that you are completing all the lessons by May 15th. Post-event, we will be conducting a graduation event at TinkerSpace during early June.</span><br /><br />
                        <span>~~~</span><br />
                        <span><em>This is more than just a course—it’s a playbook for action.</em></span><br />
                        <span>If you’re ready to challenge assumptions, build clarity, and take control of your own learning and growth, then let’s go beyond the blueprint together!</span>
                    </p>
                    <p style="font-size:1em;padding:0.5em;text-align:left">
                        <br /><span><em>Good luck and best wishes,</em></span><br /><span>Alita</span>
                    </p>
                </td>
            </tr>
        </tbody>
    </table>
</body>
</html>
`;
}

interface CSVRow {
  'Name': string;
  'Email': string;
  [key: string]: string | undefined;
}

function parseCSV(filePath: string): Promise<CSVRow[]> {
  return new Promise((resolve, reject) => {
    const results: CSVRow[] = [];
    fs.createReadStream(filePath)
      .pipe(csvParser())
      .on('data', (data: CSVRow) => results.push(data))
      .on('end', () => resolve(results))
      .on('error', reject);
  });
}

(async function() {
  try {
    const results: CSVRow[] = await parseCSV('yourtestfile.csv');

    for (const row of results) {
      const recipientName: string = row['Name'];
      const recipientEmail: string = row['Email'];

      let attendedCount = 0;
      const eventStatuses: EventStatus[] = events.map((event: EventMapping) => {
        const value = row[event.csvKey];
        const status = value && value.trim() === '1' ? event.attendedText : event.defaultText;
        if (value && value.trim() === '1') attendedCount++;
        return { label: event.label, status };
      });

      const progressBar = createProgressBar(attendedCount);

      const htmlContent = generateEmailHtml(recipientName, progressBar, eventStatuses);

      try {
        const data = await resend.emails.send({
          from: 'youremailid@gmail.com',
          to: [recipientEmail],
          subject: '[IMP] Your progress update · TSD Workshop',
          html: htmlContent
        });
        console.log(`Email sent to ${recipientName} (${recipientEmail}):`, data);
      } catch (emailError) {
        console.error(`Error sending email to ${recipientEmail}:`, emailError);
      }
    }
    console.log('All emails processed.');
  } catch (error) {
    console.error('An error occurred:', error);
  }
})();
