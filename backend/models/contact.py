from dataclasses import dataclass, asdict
from datetime import datetime, timezone


@dataclass
class ContactMessage:
    name: str
    email: str
    message: str
    created_at: str = ""

    def __post_init__(self):
        if not self.created_at:
            self.created_at = datetime.now(timezone.utc).isoformat()

    def to_dict(self):
        return asdict(self)
