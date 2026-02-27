Implementation Plan: Troubleshooting User Actions & Tasks
Based on an investigation of the codebase, I've identified the root causes for the three issues reported:

1. Create Task Issue
Root Cause: In 
client/src/redux/slices/api/taskApiSlice.js
, the base URL for tasks is incorrectly set to /user instead of /task. As a result, task creation requests are hitting the user routes which do not have a /create endpoint.

[MODIFY] 
client/src/redux/slices/api/taskApiSlice.js
Change const TASKS_URL = "/user" to const TASKS_URL = "/task".
2. Change Password Issue
Root Cause: The 
ChangePassword.jsx
 component has multiple structural problems:

The useChangePasswordMutation hook is called inside the 
handleOnSubmit
 function, which violates React Hooks rules (Hooks must be called at the top level).
The form checks if data.password !== data.cpass, but there is no input field for cpass (confirm password) in the form.
[MODIFY] 
client/src/components/ChangePassword.jsx
Move const [changePassword, {isLoading}] = useChangePasswordMutation(); outside of 
handleOnSubmit
.
Add a Confirm Password input field mapped to 
register("cpass")
.
Update the success toast message from "New User added successfully" to "Password changed successfully".
3. Profile Update Issue
Root Cause: When a user updates their profile using 
client/src/components/AddUser.jsx
, the Redux slice 
updateUser
 requires the user's ID to be passed in the body (_id) to successfully verify and save the changes per the logic in 
updateUserProfile
 controller in 
server/controllers/userController.js
. Currently, when updating a profile, 
AddUser.jsx
 drops the _id field if it's not explicitly registered in the form.

[MODIFY] 
client/src/components/AddUser.jsx
Ensure the _id is passed along with the payload to the 
updateUser
 mutation, modifying 
handleOnSubmit
 to include _id: userData._id.
4. NEW: Backend API Connectivity Issue (404s)
Root Cause: During verification, the system intercepted 404 Not Found errors on all API paths. The frontend development proxy configuration in 
vite.config.js
 targets http://localhost:8080, however the correct Node.js Express Backend is running on http://localhost:8800 (defined in 
server/.env
). The requests are being misrouted entirely by Vite.

[MODIFY] 
client/vite.config.js
Update the proxy target from "http://localhost:8080" to "http://localhost:8800".
Verification Plan
Automated/Manual Testing
Test Create Task: Navigate to the dashboard, click "Add Task", fill out the form, and verify a 200 OK network response and task visibility.
Test Change Password: Click on the user avatar, select "Change Password," enter new matching passwords, and verify the success toast. Attempt a login with the new password.
Test Profile Update: Click on the user avatar, select "Profile," change the user's title, and submit. Verify that the changes reflect cleanly without throwing errors.