import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "./ui/dialog";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useDispatch, useSelector } from "react-redux";
import { updateUser } from "@/redux/authSlice";
import axios from "axios";
import { USER_API_END_POINT } from "@/utils/constant";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";

function UpdateProfileDialog({ open, setOpen }) {
  const [loading, setLoading] = useState(false);
  const [file, setFile] = useState(null);
  const { user } = useSelector((store) => store.auth);
  const dispatch = useDispatch();

  const [input, setInput] = useState({
    fullname: user?.fullname || "",
    email: user?.email || "",
    phoneNumber: user?.phoneNumber || "",
    profile: {
      bio: user?.profile?.bio || "",
      skills: user?.profile?.skills || [],
      resume: user?.profile?.resume || "",
      resumeOriginalName: user?.profile?.resumeOriginalName || "",
    },
  });

  const changeHandler = (e) => {
    const { name, value } = e.target;
    if (name.includes(".")) {
      const [parent, child] = name.split(".");
      setInput({
        ...input,
        [parent]: {
          ...input[parent],
          [child]: value,
        },
      });
    } else {
      setInput({
        ...input,
        [name]: value,
      });
    }
  };

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
    }
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      
      const formData = new FormData();
      formData.append("fullname", input.fullname);
      formData.append("email", input.email);
      formData.append("phoneNumber", input.phoneNumber);
      formData.append("bio", input.profile.bio);
      formData.append("skills", input.profile.skills.join(","));
      
      if (file) {
        formData.append("file", file);
      }

      const res = await axios.post(
        `${USER_API_END_POINT}/profile/update`,
        formData,
        { 
          withCredentials: true,
          headers: {
            "Content-Type": "multipart/form-data",
          }
        }
      );

      if (res.data.success) {
        dispatch(updateUser(res.data.user));
        toast.success(res.data.message);
        setOpen(false);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to update profile");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="bg-gray-800 border-gray-700">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-white">Update Profile</DialogTitle>
          <DialogDescription className="text-gray-400">
            Update your profile information below
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={submitHandler} className="space-y-6">
          <div className="space-y-4">
            <div>
              <Label className="text-gray-300">Full Name</Label>
              <Input
                type="text"
                name="fullname"
                value={input.fullname}
                onChange={changeHandler}
                className="bg-gray-700 border-gray-600 text-white placeholder:text-gray-400 focus:border-blue-500 focus:ring-blue-500"
              />
            </div>
            <div>
              <Label className="text-gray-300">Email</Label>
              <Input
                type="email"
                name="email"
                value={input.email}
                onChange={changeHandler}
                className="bg-gray-700 border-gray-600 text-white placeholder:text-gray-400 focus:border-blue-500 focus:ring-blue-500"
              />
            </div>
            <div>
              <Label className="text-gray-300">Phone Number</Label>
              <Input
                type="text"
                name="phoneNumber"
                value={input.phoneNumber}
                onChange={changeHandler}
                className="bg-gray-700 border-gray-600 text-white placeholder:text-gray-400 focus:border-blue-500 focus:ring-blue-500"
              />
            </div>
            <div>
              <Label className="text-gray-300">Bio</Label>
              <Textarea
                name="profile.bio"
                value={input.profile.bio}
                onChange={changeHandler}
                className="bg-gray-700 border-gray-600 text-white placeholder:text-gray-400 focus:border-blue-500 focus:ring-blue-500 min-h-[100px]"
              />
            </div>
            <div>
              <Label className="text-gray-300">Skills (comma-separated)</Label>
              <Input
                type="text"
                name="profile.skills"
                value={input.profile.skills.join(", ")}
                onChange={(e) => {
                  setInput({
                    ...input,
                    profile: {
                      ...input.profile,
                      skills: e.target.value.split(",").map((skill) => skill.trim()),
                    },
                  });
                }}
                className="bg-gray-700 border-gray-600 text-white placeholder:text-gray-400 focus:border-blue-500 focus:ring-blue-500"
              />
            </div>
            <div>
              <Label className="text-gray-300">Resume</Label>
              <Input
                type="file"
                onChange={handleFileChange}
                className="bg-gray-700 border-gray-600 text-white placeholder:text-gray-400 focus:border-blue-500 focus:ring-blue-500"
                accept=".pdf,.doc,.docx"
              />
              {input.profile.resume && (
                <p className="text-sm text-gray-400 mt-1">
                  Current resume: {input.profile.resumeOriginalName}
                </p>
              )}
            </div>
          </div>

          <div className="flex justify-end gap-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => setOpen(false)}
              className="border-gray-600 text-gray-300 hover:bg-gray-700 hover:text-white"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={loading}
              className="bg-blue-600 hover:bg-blue-700 text-white"
            >
              {loading ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Updating...
                </>
              ) : (
                "Update Profile"
              )}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}

export default UpdateProfileDialog;
